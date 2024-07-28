export function initRenameTools() {
    let files = [];
    let originalNames = [];

    // 检查浏览器是否支持文件操作接口
    if (!isChromiumBased()) {
        document.getElementById('browserWarning').classList.remove('hidden');
    }

    // 从本地存储加载缓存的匹配结果和重命名名称
    loadCachedResults();

    // 导入文件
    document.getElementById('importFiles').addEventListener('click', async () => {
        if (!isChromiumBased()) {
            alert('该浏览器不支持文件操作接口，请使用Google浏览器。');
            return;
        }
        const fileHandles = await window.showOpenFilePicker({ multiple: true });
        files = await Promise.all(fileHandles.map(async handle => {
            const file = await handle.getFile();
            return { file, handle };
        }));
        originalNames = files.map(f => f.file.name);
        updateMatchResults();
    });

    // 导入文件夹
    document.getElementById('importFolder').addEventListener('click', async () => {
        if (!isChromiumBased()) {
            alert('该浏览器不支持文件操作接口，请使用Google浏览器。');
            return;
        }
        try {
            const dirHandle = await window.showDirectoryPicker();
            files = [];
            for await (const entry of dirHandle.values()) {
                if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    files.push({ file, handle: entry });
                }
            }
            originalNames = files.map(f => f.file.name);
            updateMatchResults();
        } catch (err) {
            console.error('Error importing folder:', err);
        }
    });

    function isChromiumBased() {
        const isChromium = window.chrome;
        const winNav = window.navigator;
        const vendorName = winNav.vendor;
        const isOpera = typeof window.opr !== "undefined";
        const isIEedge = winNav.userAgent.indexOf("Edge") > -1;

        return isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && !isOpera && !isIEedge;
    }

    // 更新匹配结果列表
    function updateMatchResults() {
        const fileTable = document.getElementById('fileTable');
        fileTable.innerHTML = '';
        files.forEach(({ file }) => {
            const row = fileTable.insertRow();
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="matchResult">${file.name}</span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="newName">${file.name}</span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="status"></span>
                </td>
            `;
        });
        saveCachedResults();
    }

    // 匹配按钮点击事件
    document.getElementById('matchButton').addEventListener('click', () => {
        const attribute = document.getElementById('fileAttribute').value;
        const rule = document.getElementById('matchRule').value;
        const string = document.getElementById('matchString').value;

        files = files.filter(({ file }) => {
            const target = attribute === 'fileName' ? file.name.split('.').slice(0, -1).join('.') : file.name.split('.').pop();
            return rule === 'contains' ? target.includes(string) : target === string;
        });

        updateMatchResults();
    });

    // 生成新文件名按钮点击事件
    document.getElementById('generateNewNames').addEventListener('click', () => {
        const position = document.getElementById('insertPosition').value;
        const insertStr = document.getElementById('insertString').value;

        const fileTable = document.getElementById('fileTable');
        const rows = fileTable.rows;

        for (let i = 0; i < rows.length; i++) {
            const oldName = rows[i].querySelector('.matchResult').textContent;
            let newName = oldName;
            const ext = newName.split('.').pop();
            const baseName = newName.slice(0, -(ext.length + 1));

            switch (position) {
                case 'prefix':
                    newName = `${insertStr}${baseName}.${ext}`;
                    break;
                case 'suffix':
                    newName = `${baseName}${insertStr}.${ext}`;
                    break;
                case 'byString': {
                    const index = baseName.indexOf(document.getElementById('matchString').value);
                    if (index !== -1) {
                        newName = `${baseName.slice(0, index)}${insertStr}${baseName.slice(index)}.${ext}`;
                    }
                    break;
                }
                case 'byPosition': {
                    const pos = parseInt(insertStr);
                    if (!isNaN(pos) && pos > 0 && pos <= baseName.length) {
                        newName = `${baseName.slice(0, pos)}${insertStr}${baseName.slice(pos)}.${ext}`;
                    }
                    break;
                }
            }

            rows[i].querySelector('.newName').textContent = newName;
        }
        saveCachedResults();
    });

    // 执行重命名按钮点击事件
    document.getElementById('executeRename').addEventListener('click', async () => {
        const fileTable = document.getElementById('fileTable');
        const rows = fileTable.rows;

        for (let i = 0; i < files.length; i++) {
            const { handle } = files[i];
            const newName = rows[i].querySelector('.newName').textContent;
            const statusSpan = rows[i].querySelector('.status');
            try {
                if (handle && typeof handle.move === 'function') {
                    await handle.move(newName);
                    statusSpan.innerHTML = '<span class="text-green-500">✓</span>';
                } else {
                    throw new Error('FileSystemFileHandle.move 接口不可用');
                }
            } catch (err) {
                console.error('Error renaming file:', err);
                statusSpan.innerHTML = '<span class="text-red-500">✗</span>';
            }
        }
    });

    // 清除缓存按钮点击事件
    document.getElementById('clearCache').addEventListener('click', () => {
        localStorage.removeItem('fileResults');
        const fileTable = document.getElementById('fileTable');
        fileTable.innerHTML = '';
        files = [];
        originalNames = [];
        saveCachedResults();
    });

    // 恢复初始状态按钮点击事件
    document.getElementById('restoreOriginal').addEventListener('click', async () => {
        const fileTable = document.getElementById('fileTable');
        const rows = fileTable.rows;

        for (let i = 0; i < files.length; i++) {
            const { handle } = files[i];
            const originalName = originalNames[i];
            const newNameSpan = rows[i].querySelector('.newName');
            const statusSpan = rows[i].querySelector('.status');
            try {
                if (handle && typeof handle.move === 'function') {
                    await handle.move(originalName);
                    newNameSpan.textContent = originalName;
                    statusSpan.innerHTML = '<span class="text-blue-500">↺</span>';
                } else {
                    throw new Error('FileSystemFileHandle.move 接口不可用');
                }
            } catch (err) {
                console.error('Error restoring file name:', err);
                statusSpan.innerHTML = '<span class="text-red-500">✗</span>';
            }
        }
        saveCachedResults();
    });

    // 保存缓存结果
    function saveCachedResults() {
        const fileTable = document.getElementById('fileTable');
        const rows = fileTable.rows;
        const results = Array.from(rows).map(row => ({
            matchResult: row.querySelector('.matchResult').textContent,
            newName: row.querySelector('.newName').textContent,
            status: row.querySelector('.status').innerHTML
        }));
        localStorage.setItem('fileResults', JSON.stringify(results));
    }

    // 加载缓存结果
    function loadCachedResults() {
        const results = JSON.parse(localStorage.getItem('fileResults')) || [];
        const fileTable = document.getElementById('fileTable');

        results.forEach(result => {
            const row = fileTable.insertRow();
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="matchResult">${result.matchResult}</span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="newName">${result.newName}</span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="status">${result.status}</span>
                </td>
            `;
        });
    }
}

