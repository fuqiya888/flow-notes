// ── i18n ──────────────────────────────────────────────────────────────────
const I18N = {
  zh: {
    writing:'书写区', save:'保存', placeholder:'在这里写下你的想法…', fontFamily:'西文字体', fontChinese:'中文字体', fontSize:'字号',
    fontSystem:'系统', fontCjkSystem:'系统', empty:'还没有笔记，开始书写吧 ✍️', search:'搜索笔记…',
    imported:'已载入编辑', saved:'已保存', saving:'保存中…', saveFailed:'保存失败',
    exportMenu:'导出', exportJson:'导出所有数据', exportTxt:'导出为纯文本',
    importData:'导入', exportDone:'已导出 JSON', exportTxtDone:'已导出文本',
    micTooltip:'语音输入', micListening:'正在聆听…点击停止', micDenied:'请允许麦克风权限', micNotSupported:'当前浏览器不支持语音输入',
    importDone:'导入成功', importErr:'导入失败，请检查文件格式（支持 .json / .txt）',
    clearTitle:'清空书写区', clearMsg:'确定清空？内容将丢失且不可恢复。',
    deleteTitle:'删除笔记', deleteMsg:'删除后可在回收站中恢复。',
    cancel:'取消', confirm:'确认',
    clear:'清空', delete:'删除',
    trashTitle:'回收站', trashEmpty:'回收站是空的', trashRestore:'恢复', trashClear:'清空回收站',
    restoreDone:'已恢复', trashCleared:'回收站已清空', trashHint:'删除的笔记可在回收站中恢复',
    mnavNotes:'历史', mnavExport:'导出', mnavSync:'同步', mnavTrash:'回收站',
    langLabel:'语言', langOpen:'打开',
    appearance:'外观', theme:'主题', settings:'设置',
    syncTitle:'☁ 云同步', syncUpload:'↑ 上传到云端', syncDownload:'↓ 从云端下载',
    syncServer:'WebDAV 服务器地址', syncUser:'账号（邮箱）', syncPass:'应用密码',
    syncUploading:'上传中…', syncDownloading:'下载中…',
    syncUploaded:'上传成功', syncMerged:'合并完成',
    syncNoServer:'请填写 WebDAV 服务器地址',
    syncNoCreds:'请填写账号（邮箱）和应用密码（不是登录密码）',
    syncNoProxy:'无法连接代理，请先运行 node server.js',
    syncNoData:'云端还没有数据，请先上传',
    syncUploadFail:'上传失败', syncDownloadFail:'下载失败',
    syncAuthFail:'（账号或密码错误）', syncNoWrite:'（无写入权限）',
    syncPathNotFound:'（服务器路径不存在）', syncFull:'（空间不足）',
    conflictTitle:'发现版本冲突', conflictMsg:'检测到两处修改，请选择保留哪个版本',
    conflictKeepLocal:'保留本地版本', conflictKeepCloud:'保留云端版本',
  },
  en: {
    writing:'Writing', save:'Save', placeholder:'Write your thoughts here…', fontFamily:'Font', fontChinese:'CJK Font', fontSize:'Size',
    fontSystem:'System', fontCjkSystem:'System', empty:'No notes yet. Start writing!', search:'Search notes…',
    imported:'Loaded', saved:'Saved', saving:'Saving…', saveFailed:'Save failed',
    exportMenu:'Export', exportJson:'Export all data', exportTxt:'Export as text',
    importData:'Import', exportDone:'JSON exported', exportTxtDone:'Text exported',
    micTooltip:'Voice input', micListening:'Listening… click to stop', micDenied:'Mic permission denied', micNotSupported:'Voice input not supported in this browser',
    importDone:'Import successful', importErr:'Import failed (supports .json / .txt)',
    clearTitle:'Clear editor', clearMsg:'Are you sure? Content will be lost and cannot be recovered.',
    deleteTitle:'Delete note', deleteMsg:'Deleted notes can be restored from trash.',
    cancel:'Cancel', confirm:'Confirm',
    clear:'Clear', delete:'Delete',
    trashTitle:'Trash', trashEmpty:'Trash is empty', trashRestore:'Restore', trashClear:'Empty trash',
    restoreDone:'Restored', trashCleared:'Trash cleared', trashHint:'Deleted notes can be restored from trash',
    mnavNotes:'History', mnavExport:'Export', mnavSync:'Sync', mnavTrash:'Trash',
    langLabel:'Language', langOpen:'Open',
    appearance:'Appearance', theme:'Theme', settings:'Settings',
    syncTitle:'☁ Cloud Sync', syncUpload:'↑ Upload', syncDownload:'↓ Download',
    syncServer:'WebDAV server address', syncUser:'Account (email)', syncPass:'App password',
    syncUploading:'Uploading…', syncDownloading:'Downloading…',
    syncUploaded:'Uploaded', syncMerged:'Merged',
    syncNoServer:'Enter WebDAV server address',
    syncNoCreds:'Enter account and app password (not login password)',
    syncNoProxy:'Cannot connect proxy — run node server.js first',
    syncNoData:'No cloud data yet — upload first',
    syncUploadFail:'Upload failed', syncDownloadFail:'Download failed',
    syncAuthFail:'(auth failed)', syncNoWrite:'(no write permission)',
    syncPathNotFound:'(path not found)', syncFull:'(storage full)',
    conflictTitle:'Version Conflict', conflictMsg:'Both versions were modified. Choose which to keep.',
    conflictKeepLocal:'Keep local', conflictKeepCloud:'Keep cloud',
  }
};
let lang = localStorage.getItem('flow_lang') || 'zh';
function t(k) { return (I18N[lang] || I18N.zh)[k] || k; }
function applyI18n() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  document.getElementById('searchInput').placeholder = t('search');
  document.getElementById('langBtn').textContent = lang === 'zh' ? 'EN' : '中';
  const sizeLabels = lang === 'zh' ? ['小','默认','大'] : ['S','M','L'];
  document.querySelectorAll('.fp-size').forEach((el, i) => el.textContent = sizeLabels[i]);

  // 更新阅读模式按钮提示
  const isReadingMode = document.body.classList.contains('reading-mode');
  toggleReadingModeBtn.title = isReadingMode
    ? (lang === 'zh' ? '退出阅读模式' : 'Exit reading mode')
    : (lang === 'zh' ? '阅读模式' : 'Reading mode');
}

// ── UUID v4 ──────────────────────────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// ── Storage（IndexedDB）───────────────────────────────────────────────────
let db = null;
const DB_NAME = 'FlowNotesDB';
const STORE = 'notes';

function openDB() {
  return new Promise(resolve => {
    try {
      const req = indexedDB.open(DB_NAME, 2); // version 2: added trash store
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const s = db.createObjectStore(STORE, { keyPath: 'id' });
          s.createIndex('updatedAt', 'updatedAt', { unique: false });
        }
        if (!db.objectStoreNames.contains('trash')) {
          db.createObjectStore('trash', { keyPath: 'id' });
        }
      };
      req.onsuccess = e => { db = e.target.result; resolve(true); };
      req.onerror = () => resolve(false);
    } catch { resolve(false); }
  });
}

// 回收站 IndexedDB 操作
const TRASH_STORE = 'trash';
function dbTrashGetAll() {
  return new Promise(resolve => {
    const tx = db.transaction(TRASH_STORE, 'readonly');
    tx.objectStore(TRASH_STORE).getAll().onsuccess = e => resolve(e.target.result || []);
    tx.onerror = () => resolve([]);
  });
}
function dbTrashPut(item) {
  return new Promise(resolve => {
    db.transaction(TRASH_STORE, 'readwrite').objectStore(TRASH_STORE).put(item).onsuccess = () => resolve();
  });
}
function dbTrashDelete(id) {
  return new Promise(resolve => {
    db.transaction(TRASH_STORE, 'readwrite').objectStore(TRASH_STORE).delete(id).onsuccess = () => resolve();
  });
}
function dbTrashClear() {
  return new Promise(resolve => {
    db.transaction(TRASH_STORE, 'readwrite').objectStore(TRASH_STORE).clear().onsuccess = () => resolve();
  });
}
function dbGetAll() {
  return new Promise(resolve => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const idx = store.index('updatedAt');
    const req = idx.openCursor(null, 'prev'); // 按 updatedAt 降序
    const results = [];
    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) { results.push(cursor.value); cursor.continue(); }
      else resolve(results);
    };
    req.onerror = () => resolve([]);
  });
}
function dbPut(note) {
  return new Promise(resolve => {
    db.transaction(STORE, 'readwrite').objectStore(STORE).put(note).onsuccess = () => resolve();
  });
}
function dbDelete(id) {
  return new Promise(resolve => {
    db.transaction(STORE, 'readwrite').objectStore(STORE).delete(id).onsuccess = () => resolve();
  });
}
async function dbClear() {
  return new Promise(resolve => {
    db.transaction(STORE, 'readwrite').objectStore(STORE).clear().onsuccess = () => resolve();
  });
}
function sortNotes() {
  notes.sort((a, b) => b.updatedAt - a.updatedAt);
}
function dbGetAllForMerge() {
  return new Promise(resolve => {
    db.transaction(STORE, 'readonly').objectStore(STORE).getAll().onsuccess = e => resolve(e.target.result || []);
  });
}

// ── State ────────────────────────────────────────────────────────────────
let notes = [];
let editingId = null;
let saveDebounceTimer = null;
let searchQuery = '';
let isSwitchingNote = false;
const PAGE_SIZE = 50;   // 每页渲染条数，防止大量笔记卡顿
let renderedCount = PAGE_SIZE;

const editor       = document.getElementById('editor');
const notesList    = document.getElementById('notesList');
const sidebar      = document.getElementById('sidebar');
const toastEl      = document.getElementById('toast');
const btnSaveIcon  = document.getElementById('saveIcon');
const btnSaveText  = document.getElementById('saveText');
const saveStatus   = document.getElementById('saveStatus');
const btnSave      = document.getElementById('btnSave');
const btnClear     = document.getElementById('btnClear');
const btnDelete    = document.getElementById('btnDelete');

// ── Helpers ──────────────────────────────────────────────────────────────
function fmt(ts) {
  const d = ts != null ? new Date(ts) : new Date();
  return d.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function preview(text) {
  const clean = text.replace(/^[\s\n\t]+|[\s\n\t]+$/g, '').replace(/[\n\t]+| {2,}/g, ' ');
  if (!clean) return lang === 'zh' ? '空白笔记' : 'Blank note';
  return clean.length > 15 ? clean.slice(0, 15) + '…' : clean;
}
function isBlank(text) {
  return !text || text.replace(/[\s\n\r\t]/g, '').length === 0;
}
function setSaveStatus(state) {
  // state: 'saved' | 'saving' | 'error'
  btnSaveIcon.className = 'save-status-icon ' + state;
  btnSaveIcon.textContent = state === 'saved' ? '✓' : state === 'saving' ? '○' : '⚠';
  btnSaveText.textContent = t(state === 'saved' ? 'saved' : state === 'saving' ? 'saving' : 'saveFailed');
  saveStatus.title = state === 'saved' ? (lang === 'zh' ? '点击立即保存' : 'Click to save now') : '';
}

let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

// ── Confirm Dialog ───────────────────────────────────────────────────────
function showConfirm(title, msg) {
  return new Promise(resolve => {
    const overlay = document.getElementById('confirmOverlay');
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMsg').textContent = msg;
    document.getElementById('confirmCancel').textContent = t('cancel');
    document.getElementById('confirmOk').textContent = t('confirm');
    overlay.classList.add('open');

    function cleanup() {
      overlay.classList.remove('open');
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      overlay.removeEventListener('click', onBg);
    }
    function onOk() { cleanup(); resolve(true); }
    function onCancel() { cleanup(); resolve(false); }
    function onBg(e) { if (e.target === overlay) { cleanup(); resolve(false); } }

    const okBtn = document.getElementById('confirmOk');
    const cancelBtn = document.getElementById('confirmCancel');
    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    overlay.addEventListener('click', onBg);
  });
}

// 从笔记内容中提取 #tag 标签
function parseTags(content) {
  return (content.match(/#[\w\u4e00-\u9fa5]+/g) || []).map(t => t.slice(1));
}

// ── Render（支持分页，防止大量笔记卡顿）──────────────────────────────
function render() {
  notesList.innerHTML = '';
  const filtered = searchQuery
    ? searchQuery.startsWith('#')
      ? notes.filter(n => {
          const tags = parseTags(n.content);
          return tags.some(tag => tag.toLowerCase().includes(searchQuery.slice(1).toLowerCase()));
        })
      : notes.filter(n => n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  if (!filtered.length) {
    notesList.innerHTML = `<p class="empty-hint">${t('empty')}</p>`;
    return;
  }

  // 搜索时取消分页限制，显示全部结果
  const showAll = !!searchQuery;
  const total = filtered.length;
  const page = showAll ? total : Math.min(renderedCount, total);
  renderedCount = page;

  for (let i = 0; i < page; i++) {
    const n = filtered[i];
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <div class="card-menu-wrap">
        <button class="card-menu-btn" data-id="${n.id}" title="${lang === 'zh' ? '更多操作' : 'More actions'}">⋯</button>
        <div class="card-dropdown" id="dropdown-${n.id}">
          <button class="card-dropdown-item card-dropdown-del" data-id="${n.id}">
            ${t('delete')}
          </button>
        </div>
      </div>
      <button class="card-collapse-btn" data-id="${n.id}" title="${lang === 'zh' ? '收起' : 'Collapse'}">∧</button>
      <div class="note-card-preview">${esc(n.content)}</div>
      <div class="note-card-time">${fmt(n.updatedAt)}</div>`;

    // 菜单按钮点击
    card.querySelector('.card-menu-btn').addEventListener('click', e => {
      e.stopPropagation();
      const dropdown = card.querySelector('.card-dropdown');
      const isOpen = dropdown.classList.contains('open');
      // 关闭其他打开的dropdown
      document.querySelectorAll('.card-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) {
        dropdown.classList.add('open');
      }
    });

    // 删除按钮点击
    card.querySelector('.card-dropdown-item').addEventListener('click', async e => {
      e.stopPropagation();
      dropdown.classList.remove('open');
      const ok = await showConfirm(t('deleteTitle'), t('deleteMsg'));
      if (!ok) return;
      moveToTrash(n);
    });

    // 收缩按钮点击
    card.querySelector('.card-collapse-btn').addEventListener('click', e => {
      e.stopPropagation();
      card.classList.remove('expanded');
    });

    // 单击展开全文，双击进入编辑（用延迟区分）
    let clickTimer = null;
    card.addEventListener('click', e => {
      if (e.target.closest('.card-menu-wrap')) return;
      if (e.target.closest('.card-collapse-btn')) return;
      if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; return; }
      clickTimer = setTimeout(() => {
        clickTimer = null;
        // 只展开，不收缩
        if (!card.classList.contains('expanded')) {
          card.classList.add('expanded');
        }
      }, 250);
    });

    card.addEventListener('dblclick', e => {
      if (e.target.closest('.card-menu-wrap')) return;
      if (e.target.closest('.card-collapse-btn')) return;
      if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; }
      const sel = window.getSelection().toString();
      if (sel.length > 20) return;
      window.getSelection().removeAllRanges();
      loadNoteIntoEditor(n);
    });

    notesList.appendChild(card);
  }

  // 加载更多按钮（仅非搜索模式生效）
  if (!showAll && total > page) {
    const loadMore = document.createElement('button');
    loadMore.className = 'load-more-btn';
    loadMore.textContent = `${lang === 'zh' ? '加载更多' : 'Load more'} (${total - page} ${lang === 'zh' ? '条' : 'more'})`;
    loadMore.addEventListener('click', () => {
      renderedCount = Math.min(renderedCount + PAGE_SIZE, total);
      render();
    });
    notesList.appendChild(loadMore);
  }

  btnDelete.disabled = !editingId;
  btnClear.disabled = isBlank(editor.value);
}

// ── 智能保存置顶（双击/流转前调用）────────────────────────────────────────
async function flushCurrentEditor() {
  const text = editor.value;
  if (isBlank(text)) return; // 空内容直接丢弃

  const now = Date.now();
  if (editingId) {
    // 正在编辑已有笔记：仅当内容有变化时更新它
    const idx = notes.findIndex(n => n.id === editingId);
    if (idx !== -1 && notes[idx].content !== text) {
      notes[idx].content = text;
      notes[idx].updatedAt = now;
      await dbPut(notes[idx]);
      notes.sort((a, b) => b.updatedAt - a.updatedAt);
    }
  } else {
    // 书写区有内容但不是已有笔记 → 作为新笔记入库
    const note = { id: uuid(), content: text, createdAt: now, updatedAt: now };
    notes.unshift(note);
    await dbPut(note);
    notes.sort((a, b) => b.updatedAt - a.updatedAt);
  }
}

// ── Mobile Nav (sidebarVisible must be defined before loadNoteIntoEditor) ──
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
let sidebarVisible = false;

function showSidebar() {
  sidebar.classList.remove('collapsed');
  sidebarBackdrop.classList.add('open');
  sidebarVisible = true;
}
function hideSidebar() {
  sidebar.classList.add('collapsed');
  sidebarBackdrop.classList.remove('open');
  sidebarVisible = false;
}

async function loadNoteIntoEditor(note) {
  // 标记正在切换笔记，阻止 blur 事件触发 autoSave
  isSwitchingNote = true;

  // 如果当前在阅读模式，自动退出
  if (document.body.classList.contains('reading-mode')) {
    document.body.classList.remove('reading-mode');
    toggleReadingModeBtn.classList.remove('active');
    toggleReadingModeBtn.textContent = '📖';
    toggleReadingModeBtn.title = lang === 'zh' ? '阅读模式' : 'Reading mode';
  }

  // 取消防抖计时器，先同步保存当前内容
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = null;
  localStorage.removeItem('flow_draft');
  await flushCurrentEditor();

  // 载入目标笔记
  editor.value = note.content;
  editingId = note.id;
  setSaveStatus('saved');
  render();
  editor.focus();
  showToast(t('imported'));

  // 手机端：选择笔记后自动关闭侧边栏
  if (sidebarVisible) hideSidebar();

  // 延迟重置标志，确保 blur 事件不会误触发
  requestAnimationFrame(() => { isSwitchingNote = false; });
}

// ── Auto-save（离开焦点 1.5s 防抖）───────────────────────────────────────
editor.addEventListener('input', () => {
  clearTimeout(saveDebounceTimer);
  setSaveStatus('saving');
  saveDebounceTimer = setTimeout(() => autoSave(), 1500);
  btnClear.disabled = isBlank(editor.value);
});

editor.addEventListener('blur', () => {
  // 如果正在切换笔记（loadNoteIntoEditor 中），跳过 blur 的 autoSave
  if (isSwitchingNote) return;
  if (saveDebounceTimer) {
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = null;
    autoSave();
  }
});

// ── 无感自动保存（编辑已有笔记时静默更新；新笔记只缓存草稿）───────────────
async function autoSave() {
  const text = editor.value;
  if (isBlank(text)) { setSaveStatus('saved'); return; }

  setSaveStatus('saving');
  try {
    if (editingId) {
      // 编辑已有笔记：静默更新到 IndexedDB
      const now = Date.now();
      const idx = notes.findIndex(n => n.id === editingId);
      if (idx !== -1) {
        notes[idx].content = text;
        notes[idx].updatedAt = now;
        await dbPut(notes[idx]);
        notes.sort((a, b) => b.updatedAt - a.updatedAt);
        render();
      }
    } else {
      // 新笔记：只缓存草稿到 localStorage，不写入 IndexedDB，不显示到列表
      localStorage.setItem('flow_draft', JSON.stringify({ text }));
    }
    setSaveStatus('saved');
  } catch {
    setSaveStatus('error');
  }
}

// ── 保存按钮 = 最终提交（入库 + 置顶 + 清空书写区）────────────────────────
async function submitNote() {
  const text = editor.value;
  if (isBlank(text)) return;

  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = null;
  localStorage.removeItem('flow_draft');
  setSaveStatus('saving');
  try {
    const now = Date.now();
    if (editingId) {
      const idx = notes.findIndex(n => n.id === editingId);
      if (idx !== -1) {
        notes[idx].content = text;
        notes[idx].updatedAt = now;
        await dbPut(notes[idx]);
      }
    } else {
      const note = { id: uuid(), content: text, createdAt: now, updatedAt: now };
      notes.unshift(note);
      await dbPut(note);
    }
    notes.sort((a, b) => b.updatedAt - a.updatedAt);
    editor.value = '';
    editingId = null;
    btnClear.disabled = true;
    btnDelete.disabled = true;
    render();
    setSaveStatus('saved');
  } catch {
    setSaveStatus('error');
  }
}

// 手动保存（点击状态图标）
saveStatus.addEventListener('click', async () => {
  if (saveDebounceTimer) {
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = null;
  }
  await autoSave();
});

// ── Save button → 提交 ────────────────────────────────────────────────────
btnSave.addEventListener('click', submitNote);

// ── Clear & Delete ───────────────────────────────────────────────────────
btnClear.addEventListener('click', async () => {
  if (isBlank(editor.value)) return;
  const ok = await showConfirm(t('clearTitle'), t('clearMsg'));
  if (!ok) return;
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = null;
  editor.value = '';
  editingId = null;
  setSaveStatus('saved');
  btnClear.disabled = true;
  render();
});

btnDelete.addEventListener('click', async () => {
  if (!editingId) return;
  const ok = await showConfirm(t('deleteTitle'), t('deleteMsg'));
  if (!ok) return;
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = null;
  const note = notes.find(n => n.id === editingId);
  if (note) moveToTrash(note);
  editor.value = '';
  editingId = null;
  setSaveStatus('saved');
  btnClear.disabled = true;
});

// ── Voice Input（Web Speech API，免费）──────────────────────────────
(function() {
  const desktopMic = document.getElementById('btnMic');
  const mobileMic  = document.getElementById('mnavMic');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // 不支持时 或 iOS Safari（API 存在但实际不可用）则隐藏按钮
  if (!SpeechRecognition || isIOS) {
    if (desktopMic) desktopMic.style.display = 'none';
    if (mobileMic)  mobileMic.style.display  = 'none';
    return;
  }

  let recognition  = null;
  let recognizing   = false;

  // 单例 recognition
  function getRecognition() {
    if (!recognition) {
      recognition = new SpeechRecognition();
      recognition.continuous    = true;
      recognition.interimResults = true;
      recognition.lang = lang === 'zh' ? 'zh-CN' : 'en-US';

      recognition.onresult = (e) => {
        let interim = '', final = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) final += t;
          else interim += t;
        }
        if (final) insertAtCursor(editor, final);
        // 中间结果显示在当前活跃按钮的 title 上
        const active = recognizing;
        if (interim && active) {
          const btn = isDesktopActive() ? desktopMic : mobileMic;
          if (btn) btn.title = interim.slice(-30);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'not-allowed' || e.error === 'denied') {
          showToast(t('micDenied'));
        }
        stopRecording();
      };

      recognition.onend = () => {
        if (recognizing) stopRecording();
      };
    }
    return recognition;
  }

  function isDesktopActive() {
    // 判断当前按下的按钮是桌面还是手机版本
    // 简单方案：识别过程中记住是哪个按钮触发的
    return document.activeElement && (document.activeElement.id === 'btnMic' || desktopMic && desktopMic.classList.contains('recording'));
  }

  function insertAtCursor(textarea, text) {
    const start = textarea.selectionStart;
    const end   = textarea.selectionEnd;
    textarea.value = textarea.value.slice(0, start) + text + textarea.value.slice(end);
    const pos = start + text.length;
    textarea.selectionStart = textarea.selectionEnd = pos;
    textarea.focus();
    textarea.dispatchEvent(new Event('input'));
  }

  function setActiveMic(btn, active) {
    if (btn) {
      btn.classList.toggle('recording', active);
      const span = btn.querySelector('span');
      if (span) {
        span.textContent = active ? '🔴' : '🎤';
      }
      btn.title = active ? t('micListening') : t('micTooltip');
    }
  }

  function startRecording(btn) {
    try {
      const r = getRecognition();
      r.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      r.start();
      recognizing = true;
      setActiveMic(desktopMic, true);
      setActiveMic(mobileMic,  true);
    } catch (err) { /* 已在运行 */ }
  }

  function stopRecording() {
    recognizing = false;
    setActiveMic(desktopMic, false);
    setActiveMic(mobileMic,  false);
    try { if (recognition) recognition.stop(); } catch {}
  }

  // 同时绑定两个按钮
  [desktopMic, mobileMic].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (recognizing) stopRecording();
      else startRecording(btn);
    });
  });
})();


// ── 回收站（IndexedDB 持久化，清除浏览器缓存也不会丢） ────────────────────
let trash = []; // 内存缓存

async function loadTrash() {
  trash = await dbTrashGetAll();
}
async function saveTrash() { /* 无需手动保存，已在每个操作中即时写入 */ }

async function moveToTrash(note) {
  // 从笔记列表和 IndexedDB 中移除
  await dbDelete(note.id);
  notes = notes.filter(n => n.id !== note.id);
  // 写入回收站
  const trashItem = { ...note, deletedAt: Date.now() };
  await dbTrashPut(trashItem);
  trash.unshift(trashItem);
  if (editingId === note.id) {
    editingId = null;
    editor.value = '';
    btnClear.disabled = true;
  }
  render();
}

async function restoreFromTrash(id) {
  const idx = trash.findIndex(t => t.id === id);
  if (idx === -1) return;
  const item = trash[idx];
  const restored = { id: item.id, content: item.content, createdAt: item.createdAt, updatedAt: Date.now() };
  notes.unshift(restored);
  await dbPut(restored);
  notes.sort((a, b) => b.updatedAt - a.updatedAt);
  await dbTrashDelete(id);
  trash.splice(idx, 1);
  render();
  renderTrash();
  showToast(t('restoreDone'));
}

function renderTrash() {
  const trashList = document.getElementById('trashList');
  if (!trash.length) {
    trashList.innerHTML = `<p class="trash-empty">${t('trashEmpty')}</p>`;
    return;
  }
  trashList.innerHTML = '';
  trash.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'trash-item';
    el.innerHTML = `
      <span class="trash-item-text">${esc(preview(item.content))}</span>
      <span class="trash-item-time">${fmt(item.deletedAt)}</span>
      <button class="trash-item-restore" data-id="${item.id}">${t('trashRestore')}</button>`;
    el.querySelector('.trash-item-restore').addEventListener('click', () => restoreFromTrash(item.id));
    trashList.appendChild(el);
  });
}

// 回收站入口（设置面板内的按钮）
document.getElementById('settingsTrashBtn').addEventListener('click', () => {
  document.getElementById('settingsOverlay').classList.remove('open');
  renderTrash();
  document.getElementById('trashOverlay').classList.add('open');
});
document.getElementById('trashCloseBtn').addEventListener('click', () => {
  document.getElementById('trashOverlay').classList.remove('open');
});
document.getElementById('trashOverlay').addEventListener('click', e => {
  if (e.target.id === 'trashOverlay') document.getElementById('trashOverlay').classList.remove('open');
});
document.getElementById('trashClearBtn').addEventListener('click', async () => {
  if (!trash.length) return;
  const ok = await showConfirm(t('trashClear'), t('trashTitle'));
  if (!ok) return;
  await dbTrashClear();
  trash = [];
  renderTrash();
  showToast(t('trashCleared'));
});

// ── Search ───────────────────────────────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  render();
});

// ── Sidebar Toggle ───────────────────────────────────────────────────────
document.getElementById('toggleSidebar').addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// ── Reading Mode Toggle ────────────────────────────────────────────────────
const toggleReadingModeBtn = document.getElementById('toggleReadingMode');
toggleReadingModeBtn.addEventListener('click', () => {
  const isReadingMode = document.body.classList.toggle('reading-mode');
  toggleReadingModeBtn.classList.toggle('active', isReadingMode);
  toggleReadingModeBtn.textContent = isReadingMode ? '📝' : '📖';
  toggleReadingModeBtn.title = isReadingMode ? (lang === 'zh' ? '退出阅读模式' : 'Exit reading mode') : (lang === 'zh' ? '阅读模式' : 'Reading mode');
});

// ── Export / Import ──────────────────────────────────────────────────────
// 导出按钮在设置面板内

function localDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

document.getElementById('exportJsonBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `flow_backup_${localDateStr()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  showToast(t('exportDone'));
});

document.getElementById('exportTxtBtn').addEventListener('click', () => {
  const text = notes.map((n, i) => `[${i + 1}] ${fmt(n.updatedAt)}\n${n.content}`).join('\n\n---\n\n');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `flow_notes_${localDateStr()}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  showToast(t('exportTxtDone'));
});

document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const raw = await file.text();
    const fileName = file.name.toLowerCase();
    let imported = [];

    if (fileName.endsWith('.json')) {
      // JSON 备份文件：合并导入
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) throw new Error('invalid');
      const localMap = new Map(notes.map(n => [n.id, n]));
      for (const item of data) {
        if (!item.id || !item.content) continue;
        const existing = localMap.get(item.id);
        if (existing) {
          if ((item.updatedAt || 0) > existing.updatedAt) {
            localMap.set(item.id, item);
          }
        } else {
          localMap.set(item.id, item);
        }
      }
      notes = Array.from(localMap.values());
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      store.clear();
      for (const n of notes) store.put(n);
      await new Promise(r => tx.oncomplete = r);
    } else if (fileName.endsWith('.txt')) {
      // TXT 文件：按 --- 分隔，每段作为一条新笔记
      const now = Date.now();
      const blocks = raw.split(/\n\n---\n\n/).map(b => b.trim()).filter(b => b.length > 0);
      if (blocks.length === 0) throw new Error('empty');
      for (const block of blocks) {
        const note = { id: uuid(), content: block.trim(), createdAt: now, updatedAt: now };
        imported.push(note);
        await dbPut(note);
        notes.push(note);
      }
      notes.sort((a, b) => b.updatedAt - a.updatedAt);
    } else {
      throw new Error('unsupported');
    }

    notes.sort((a, b) => b.updatedAt - a.updatedAt);
    render();
    showToast(t('importDone'));
  } catch {
    showToast(t('importErr'));
  }
  e.target.value = '';
});

// ── Font panel ───────────────────────────────────────────────────────────
// 字体芯片和主题已移到设置面板内，事件绑定不变但移除旧 fontBtn/fontPanel toggle

const CJK_FONTS = {
  system: "'Microsoft YaHei', 'SimSun', sans-serif",
  heiti: "'SimHei', '黑体', sans-serif",
  songti: "'SimSun', '宋体', serif",
  fangsong: "'FangSong', '仿宋', serif",
  kaiti: "'KaiTi', '楷体', 'STKaiti', serif",
  notoSans: "'Noto Sans SC', sans-serif",
  notoSerif: "'Noto Serif SC', serif",
};

let currentCJK = localStorage.getItem('flow_cjk') || 'system';

function applyFont(f) {
  document.querySelectorAll('[data-font]').forEach(c => c.classList.toggle('active', c.dataset.font === f));
  localStorage.setItem('flow_font', f);
  rebuildFontFamily(f, currentCJK);
}

function applyCJK(cjk) {
  currentCJK = cjk;
  const f = localStorage.getItem('flow_font') || 'system';
  document.querySelectorAll('[data-cjk]').forEach(c => c.classList.toggle('active', c.dataset.cjk === cjk));
  localStorage.setItem('flow_cjk', cjk);
  rebuildFontFamily(f, cjk);
}

function rebuildFontFamily(latin, cjk) {
  const latinMap = {
    system: "system-ui, -apple-system",
    inter: "'Inter'",
    poppins: "'Poppins'",
    lato: "'Lato'",
    merriweather: "'Merriweather'",
    sourcesans: "'Source Sans 3'",
    nunito: "'Nunito'",
    playfair: "'Playfair Display'",
  };
  const latinPart = latinMap[latin] || "system-ui, -apple-system";
  const cjkPart = CJK_FONTS[cjk] || CJK_FONTS.system;
  const full = `${latinPart}, ${cjkPart}, sans-serif`;
  // 同时设置 CSS 变量和 body 内联样式，确保一定生效
  document.documentElement.style.setProperty('--font-family', full);
  document.body.style.fontFamily = full;
  document.getElementById('editor').style.fontFamily = full;
  // 更新所有笔记卡片和输入框
  document.querySelectorAll('.note-card-preview, .search-input').forEach(el => el.style.fontFamily = full);
}

function applySize(s) {
  document.documentElement.style.setProperty('--font-size', s + 'px');
  document.querySelectorAll('.fp-size').forEach(c => c.classList.toggle('active', c.dataset.size === String(s)));
  localStorage.setItem('flow_size', s);
}

document.querySelectorAll('[data-font]').forEach(c => c.addEventListener('click', () => applyFont(c.dataset.font)));
document.querySelectorAll('[data-cjk]').forEach(c => c.addEventListener('click', () => applyCJK(c.dataset.cjk)));
document.querySelectorAll('.fp-size').forEach(c => c.addEventListener('click', () => applySize(c.dataset.size)));

// ── 字体缓存清理（v2）：一次性强制清除所有旧缓存 ──
if (localStorage.getItem('flow_fontcache_v2') !== 'cleaned') {
  localStorage.removeItem('flow_font');
  localStorage.removeItem('flow_cjk');
  localStorage.removeItem('flow_size');
  localStorage.setItem('flow_fontcache_v2', 'cleaned');
}

applyFont(localStorage.getItem('flow_font') || 'system');
applyCJK(localStorage.getItem('flow_cjk') || 'system');
applySize(parseInt(localStorage.getItem('flow_size')) || 16);

// ── Theme ─────────────────────────────────────────────────────────────────
const themeOrder = ['green', 'warm', 'night'];
const themeClass = { green: 'theme-green', warm: 'theme-warm', night: 'theme-night' };
const themeDotColor = { green: '#2E7D5E', warm: '#C0622F', night: '#555555' };

function applyTheme(theme) {
  const cls = themeClass[theme] || 'theme-green';
  const fontCls = [...document.body.classList].filter(c => c.startsWith('font-'));
  document.body.className = [cls, ...fontCls].filter(Boolean).join(' ');
  document.getElementById('themeDotGreen').classList.toggle('active', theme === 'green');
  document.getElementById('themeDotWarm').classList.toggle('active', theme === 'warm');
  document.getElementById('themeDotNight').classList.toggle('active', theme === 'night');
  localStorage.setItem('flow_theme', theme);
}

applyTheme(localStorage.getItem('flow_theme') || 'green');

// 主题圆点点击（在设置面板内）
document.getElementById('themeDotGreen').addEventListener('click', () => applyTheme('green'));
document.getElementById('themeDotWarm').addEventListener('click', () => applyTheme('warm'));
document.getElementById('themeDotNight').addEventListener('click', () => applyTheme('night'));


// ── Cloud Sync (WebDAV via local proxy) ────────────────────────────────────
// 浏览器 → localhost proxy → WebDAV 服务器
// 本地代理已包含 CORS headers，绕过跨域限制
// 坚果云：dav.jianguoyun.com  海外：Nextcloud / ownCloud / Box 等

const syncStatus = document.getElementById('syncStatus');
const syncServerEl = document.getElementById('syncServer');
const syncUserEl = document.getElementById('syncUser');
const syncPassEl = document.getElementById('syncPass');

// 本地代理路径（不需要用户改动，server.js 负责转发到真实 WebDAV）
const PROXY = location.origin;
const DAV_FILE = '/dav/flow-notes/data.json';

// 设置面板开关
document.getElementById('gearBtn').addEventListener('click', () => {
  document.getElementById('settingsOverlay').classList.add('open');
});
document.getElementById('settingsClose').addEventListener('click', () => {
  document.getElementById('settingsOverlay').classList.remove('open');
});
document.getElementById('settingsOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// 密码加密存储（SubtleCrypto AES-GCM）
const SYNC_KEY_ALIAS = 'flow_sync_key';
async function getOrCreateCryptoKey() {
  const stored = localStorage.getItem(SYNC_KEY_ALIAS);
  if (stored) {
    const jwk = JSON.parse(stored);
    return crypto.subtle.importKey('jwk', jwk, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  }
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  const jwk = await crypto.subtle.exportKey('jwk', key);
  localStorage.setItem(SYNC_KEY_ALIAS, JSON.stringify(jwk));
  return key;
}
async function encryptPass(plain) {
  const key = await getOrCreateCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plain);
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const bundle = { iv: Array.from(iv), data: Array.from(new Uint8Array(cipher)) };
  return JSON.stringify(bundle);
}
async function decryptPass(bundle) {
  try {
    const key = await getOrCreateCryptoKey();
    const { iv, data } = JSON.parse(bundle);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, new Uint8Array(data));
    return new TextDecoder().decode(decrypted);
  } catch { return null; }
}

// 恢复保存的服务器地址、账号和密码
syncServerEl.value = localStorage.getItem('sync_server') || 'https://dav.jianguoyun.com/dav';
syncUserEl.value = localStorage.getItem('sync_user') || '';
const savedPass = localStorage.getItem('sync_pass');
if (savedPass) {
  decryptPass(savedPass).then(p => {
    if (p) { syncPassEl.value = p; syncPassEl.placeholder = t('syncPass'); }
  });
}

// 密码显示/隐藏切换
const passwordToggle = document.getElementById('passwordToggle');
passwordToggle.addEventListener('click', () => {
  const isPassword = syncPassEl.type === 'password';
  syncPassEl.type = isPassword ? 'text' : 'password';
  passwordToggle.dataset.visible = isPassword ? 'true' : 'false';
  passwordToggle.title = isPassword ? (lang === 'zh' ? '隐藏密码' : 'Hide password') : (lang === 'zh' ? '显示密码' : 'Show password');
});

function syncAuth() {
  const server = syncServerEl.value.trim();
  const u = syncUserEl.value.trim();
  const p = syncPassEl.value.trim();
  if (!server) { syncStatus.textContent = t('syncNoServer'); return null; }
  if (!u || !p) { syncStatus.textContent = t('syncNoCreds'); return null; }
  localStorage.setItem('sync_server', server);
  localStorage.setItem('sync_user', u);
  encryptPass(p).then(enc => localStorage.setItem('sync_pass', enc));
  return { auth: 'Basic ' + btoa(u + ':' + p) };
}

document.getElementById('btnUpload').addEventListener('click', async () => {
  const btn = document.getElementById('btnUpload');
  btn.classList.add('syncing');
  const creds = syncAuth(); if (!creds) { btn.classList.remove('syncing'); return; }
  const { auth } = creds;
  syncStatus.textContent = t('syncUploading');
  try {
    // 上传格式：{ notes, deletedIds } 兼容旧版纯数组
    const trashIds = trash.map(t => t.id);
    const body = JSON.stringify({ notes, deletedIds: trashIds });
    const r = await fetch(PROXY + DAV_FILE, {
      method: 'PUT',
      headers: { Authorization: auth, 'Content-Type': 'application/json', 'X-Target-Host': syncServerEl.value.trim() },
      body
    });
    if (!r.ok) {
      const detail = r.status === 401 ? t('syncAuthFail')
        : r.status === 403 ? t('syncNoWrite')
        : r.status === 404 ? t('syncPathNotFound')
        : r.status === 507 ? t('syncFull')
        : `(${r.status})`;
      syncStatus.textContent = `✗ ${t('syncUploadFail')} ${r.status}${detail}`;
      return;
    }
    syncStatus.textContent = `✓ ${t('syncUploaded')}（${notes.length} ${lang === 'zh' ? '条' : 'notes'}）`;
  } catch (e) {
    syncStatus.textContent = e.name === 'TypeError'
      ? `✗ ${t('syncNoProxy')}`
      : `✗ ${e.message || t('syncUploadFail')}`;
  } finally {
    btn.classList.remove('syncing');
  }
});

document.getElementById('btnDownload').addEventListener('click', async () => {
  const btn = document.getElementById('btnDownload');
  btn.classList.add('syncing');
  const creds = syncAuth(); if (!creds) { btn.classList.remove('syncing'); return; }
  const { auth } = creds;
  syncStatus.textContent = t('syncDownloading');
  try {
    const r = await fetch(PROXY + DAV_FILE, {
      headers: {
        Authorization: auth,
        'X-Target-Host': syncServerEl.value.trim(),
      }
    });
    if (!r.ok) {
      if (r.status === 404) { syncStatus.textContent = `✗ ${t('syncNoData')}`; return; }
      syncStatus.textContent = `✗ ${t('syncDownloadFail')} ${r.status}`;
      return;
    }
    // 兼容旧版纯数组格式和新版 { notes, deletedIds } 格式
    let cloudNotes = [];
    let cloudDeletedIds = [];
    if (Array.isArray(cloudData)) {
      cloudNotes = cloudData;
    } else if (cloudData && Array.isArray(cloudData.notes)) {
      cloudNotes = cloudData.notes || [];
      cloudDeletedIds = cloudData.deletedIds || [];
    } else {
      throw new Error(lang === 'zh' ? '云端数据格式错误' : 'Invalid cloud data format');
    }

    // ── 智能合并 ───────────────────────────────────────────────
    const cloudMap = new Map(cloudNotes.map(n => [n.id, n]));
    const localMap = new Map(notes.map(n => [n.id, n]));
    const conflictIds = [];
    let merged = 0, kept = 0, added = 0, removed = 0;

    // 1) 云端 → 本地（新增 / 更新 / 冲突）
    for (const [id, cn] of cloudMap) {
      const ln = localMap.get(id);
      if (!ln) {
        notes.push(cn);
        await dbPut(cn);
        added++;
      } else if (cn.content !== ln.content) {
        const diff = Math.abs(cn.updatedAt - ln.updatedAt);
        if (diff > 2 * 60 * 60 * 1000) {
          const winner = cn.updatedAt > ln.updatedAt ? cn : ln;
          Object.assign(ln, winner);
          await dbPut(ln);
          merged++;
        } else {
          conflictIds.push({ id, local: ln, cloud: cn });
        }
      } else {
        if (cn.updatedAt > ln.updatedAt) {
          Object.assign(ln, cn);
          await dbPut(ln);
        }
        kept++;
      }
    }

    // 2) 本地有但 id 在 cloudDeletedIds 中 → 从本地删除
    for (const n of [...notes]) {
      if (!cloudMap.has(n.id) && cloudDeletedIds.includes(n.id)) {
        notes = notes.filter(x => x.id !== n.id);
        await dbDelete(n.id);
        removed++;
      }
    }

    sortNotes();

    // ── 逐条解决冲突 ──────────────────────────────────────────────────
    if (conflictIds.length > 0) {
      syncStatus.textContent = lang === 'zh'
        ? `发现 ${conflictIds.length} 处冲突，正在处理…`
        : `Found ${conflictIds.length} conflict(s), resolving…`;

      for (const { id, local: ln, cloud: cn } of conflictIds) {
        const choice = await showConflictDialog(ln, cn);
        if (choice === 'cloud') {
          Object.assign(ln, cn);
          await dbPut(ln);
          merged++;
        } else {
          // 保留本地，merged 不变
          kept++;
        }
        // 同步 notes 数组（因为 sortNotes 后顺序可能变化）
        const idx = notes.findIndex(n => n.id === id);
        if (idx !== -1) Object.assign(notes[idx], ln);
      }
    }

    sortNotes();
    render();
    syncStatus.textContent = `✓ ${t('syncMerged')}（${lang === 'zh' ? `新增${added} 更新${merged} 保留${kept} 移除${removed}` : `+${added} ~${merged} ·${kept} -${removed}`}）`;
  } catch (e) {
    syncStatus.textContent = e.name === 'TypeError'
      ? `✗ ${t('syncNoProxy')}`
      : `✗ ${e.message || t('syncDownloadFail')}`;
  } finally {
    btn.classList.remove('syncing');
  }
});

// ── 冲突解决对话框 ──────────────────────────────────────────────────────
function showConflictDialog(localNote, cloudNote) {
  return new Promise(resolve => {
    const overlay = document.getElementById('conflictOverlay') || createConflictOverlay();
    document.getElementById('conflictTitle').textContent = t('conflictTitle');
    document.getElementById('conflictMsg').textContent = t('conflictMsg');

    const localPreview = document.getElementById('conflictLocalPreview');
    const cloudPreview = document.getElementById('conflictCloudPreview');
    const localTime = document.getElementById('conflictLocalTime');
    const cloudTime = document.getElementById('conflictCloudTime');

    localPreview.textContent = localNote.content.slice(0, 300) + (localNote.content.length > 300 ? '…' : '');
    cloudPreview.textContent = cloudNote.content.slice(0, 300) + (cloudNote.content.length > 300 ? '…' : '');
    localTime.textContent = fmt(localNote.updatedAt);
    cloudTime.textContent = fmt(cloudNote.updatedAt);

    // 显式设置按钮文本，防止语言切换后不同步
    document.getElementById('conflictLocalBtn').textContent = t('conflictKeepLocal');
    document.getElementById('conflictCloudBtn').textContent = t('conflictKeepCloud');

    overlay.classList.add('open');

    const cleanup = () => overlay.classList.remove('open');
    document.getElementById('conflictLocalBtn').onclick = () => { cleanup(); resolve('local'); };
    document.getElementById('conflictCloudBtn').onclick = () => { cleanup(); resolve('cloud'); };
  });
}

function createConflictOverlay() {
  const html = `<div class="conflict-overlay" id="conflictOverlay">
  <div class="conflict-dialog">
    <div class="conflict-title" id="conflictTitle"></div>
    <div class="conflict-msg" id="conflictMsg"></div>
    <div class="conflict-versions">
      <div class="conflict-version conflict-version-local">
        <div class="conflict-version-header">
          <span>${lang === 'zh' ? '📱 保留本地版本' : '📱 Keep local'}</span>
          <span class="conflict-time" id="conflictLocalTime"></span>
        </div>
        <div class="conflict-preview" id="conflictLocalPreview"></div>
        <button class="conflict-btn" id="conflictLocalBtn">${lang === 'zh' ? '保留本地' : 'Keep local'}</button>
      </div>
      <div class="conflict-version conflict-version-cloud">
        <div class="conflict-version-header">
          <span>${lang === 'zh' ? '☁️ 保留云端版本' : '☁️ Keep cloud'}</span>
          <span class="conflict-time" id="conflictCloudTime"></span>
        </div>
        <div class="conflict-preview" id="conflictCloudPreview"></div>
        <button class="conflict-btn conflict-btn-primary" id="conflictCloudBtn">${lang === 'zh' ? '保留云端' : 'Keep cloud'}</button>
      </div>
    </div>
  </div>
</div>`;
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstElementChild);
  return document.getElementById('conflictOverlay');
}

// ── Lang ─────────────────────────────────────────────────────────────────
document.getElementById('langBtn').addEventListener('click', () => {
  lang = lang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('flow_lang', lang);
  applyI18n();
  render();
  // 同步麦克风按钮提示
  [document.getElementById('mnavMic'), document.getElementById('btnMic')].forEach(btn => {
    if (btn && !btn.classList.contains('recording')) {
      btn.title = t('micTooltip');
    }
  });
});

// ── Keyboard shortcuts (macOS: Cmd, Windows: Ctrl) ──────────────────────
const mod = (navigator.userAgentData?.platform || navigator.platform || '').includes('Mac') ? 'metaKey' : 'ctrlKey';
document.addEventListener('keydown', e => {
  if (e[mod] && e.key === 's') {
    e.preventDefault();
    submitNote();
  }
});

// ── Mobile Nav event bindings ──────────────────────────────────────────────
sidebarBackdrop.addEventListener('click', hideSidebar);

// 侧边栏内向下滑动超过阈值时关闭
let sidebarTouchStartY = 0;
sidebar.addEventListener('touchstart', e => { sidebarTouchStartY = e.touches[0].clientY; }, { passive: true });
sidebar.addEventListener('touchmove', e => {
  const scrollTop = sidebar.querySelector('.notes-list').scrollTop;
  if (scrollTop <= 0 && e.touches[0].clientY - sidebarTouchStartY > 60) {
    hideSidebar();
  }
}, { passive: true });

document.getElementById('mnavNotes').addEventListener('click', () => {
  if (sidebarVisible) hideSidebar(); else { render(); showSidebar(); }
});
document.getElementById('mnavExport').addEventListener('click', (e) => {
  e.preventDefault(); e.stopPropagation();
  document.getElementById('settingsOverlay').classList.add('open');
});
document.getElementById('mnavSync').addEventListener('click', (e) => {
  e.preventDefault(); e.stopPropagation();
  document.getElementById('settingsOverlay').classList.add('open');
});
document.getElementById('mnavTrash').addEventListener('click', (e) => {
  e.preventDefault(); e.stopPropagation();
  renderTrash();
  document.getElementById('trashOverlay').classList.add('open');
});

// ── PWA Service Worker ────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ── Init ─────────────────────────────────────────────────────────────────
openDB().then(async (ok) => {
  await loadTrash();
  if (ok) {
    notes = await dbGetAll();
  }
  notes.sort((a, b) => b.updatedAt - a.updatedAt);

  // 首次使用：按语言插入使用说明笔记（中英文各自独立判断）
  if (notes.length === 0 && !localStorage.getItem('flow_welcomed_' + lang)) {
    const sampleNote = {
      id: uuid(),
      content: lang === 'zh'
        ? `# 欢迎使用 Flow Notes ✍️

感谢选择 Flow Notes！这是一份简单易懂的使用指南，帮助你快速上手。

## 📝 基本操作

**创建笔记**
- 在书写区输入内容
- 点击「保存」按钮或按 Ctrl+Enter
- 笔记会自动按更新时间排序

**查看笔记**
- 左侧边栏显示所有笔记
- 点击笔记标题可查看或编辑
- 支持搜索：输入关键词或 #标签名

**删除与恢复**
- 删除的笔记会进入回收站
- 在设置中打开回收站可恢复笔记
- 回收站的内容也会同步到云端

## 🎤 语音输入

点击书写区右上角的🎤按钮开始语音输入：
- 首次使用需允许麦克风权限
- 语音识别支持中文和英文
- 再次点击按钮停止录音

## #️⃣ 标签系统

用 # 开头标记标签，例如：
- #工作
- #想法
- #待办

**搜索标签**：在搜索框输入 #标签名 可快速筛选

## ☁️ 云同步（WebDAV）

在设置中配置云同步：
1. 填写 WebDAV 服务器地址
2. 填写账号和应用密码（不是登录密码）
3. 点击「上传」将笔记同步到云端
4. 点击「下载」从云端恢复数据

**冲突处理**：如果本地和云端都有修改，会选择保留最新版本，并提示冲突解决。

## 📤 导入与导出

**导出数据**
- 导出 JSON：完整备份，包含所有格式
- 导出文本：纯文本格式，便于编辑

**导入数据**
- 支持 .json 和 .txt 格式
- 导入的笔记会追加到现有笔记中

## ⚙️ 个性化设置

**语言切换**
- 支持中文和英文
- 点击右上角「EN」或「中」切换

**主题设置**
- 浅色模式：适合白天使用
- 深色模式：保护眼睛，适合夜间

**字体设置**
- 西文字体：选择你喜欢的英文字体
- 中文字体：优化中文显示效果
- 字号调整：小、默认、大三种尺寸

## 📱 多设备使用

Flow Notes 支持手机和电脑：
- 手机版自动隐藏侧边栏，点击☰可展开
- 电脑版显示完整侧边栏
- 通过云同步保持数据一致

## 💡 小贴士

- 定期导出备份重要笔记
- 使用标签分类管理笔记
- 回收站会保留删除的笔记，记得定期清理
- 云同步前建议先备份数据

---

开始你的第一篇笔记吧！点击书写区，输入内容，保存即可 ✨

#使用指南 #入门 #功能介绍`
        : `# Welcome to Flow Notes ✍️

Thank you for choosing Flow Notes! This is a simple guide to help you get started quickly.

## 📝 Basic Operations

**Create Notes**
- Type content in the writing area
- Click "Save" button or press Ctrl+Enter
- Notes are automatically sorted by update time

**View Notes**
- All notes are displayed in the left sidebar
- Click a note title to view or edit
- Search supported: enter keywords or #tagname

**Delete & Restore**
- Deleted notes go to Trash
- Open Trash in Settings to restore notes
- Trash content also syncs to the cloud

## 🎤 Voice Input

Click the 🎤 button in the writing area to start voice input:
- Allow microphone permission on first use
- Voice recognition supports Chinese and English
- Click the button again to stop recording

## #️⃣ Tag System

Mark tags with # at the beginning, e.g.:
- #work
- #ideas
- #todo

**Search tags**: Enter #tagname in the search box to quickly filter

## ☁️ Cloud Sync (WebDAV)

Configure cloud sync in Settings:
1. Enter WebDAV server address
2. Enter account and app password (not login password)
3. Click "Upload" to sync notes to cloud
4. Click "Download" to restore data from cloud

**Conflict Resolution**: If both local and cloud versions are modified, the latest version is kept and conflict resolution is prompted.

## 📤 Import & Export

**Export Data**
- Export JSON: Full backup with all formatting
- Export Text: Plain text format for easy editing

**Import Data**
- Supports .json and .txt formats
- Imported notes are appended to existing notes

## ⚙️ Personalization

**Language Switch**
- Supports Chinese and English
- Click "EN" or "中" in the top-right corner to switch

**Theme Settings**
- Light Mode: Suitable for daytime use
- Dark Mode: Eye-friendly for nighttime

**Font Settings**
- Western Font: Choose your preferred English font
- CJK Font: Optimized for Chinese display
- Font Size: Small, Default, Large

## 📱 Multi-Device Usage

Flow Notes supports both mobile and desktop:
- Mobile version auto-hides sidebar, tap ☰ to expand
- Desktop version shows full sidebar
- Keep data consistent via cloud sync

## 💡 Tips

- Regularly export and backup important notes
- Use tags to categorize and manage notes
- Trash keeps deleted notes, remember to clean it up regularly
- Backup data before cloud syncing

---

Start your first note! Click the writing area, type content, and save ✨

#guide #getting-started #features`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await dbPut(sampleNote);
    notes.push(sampleNote);
    localStorage.setItem('flow_welcomed_' + lang, '1');
  }

  // 恢复未提交的草稿
  const draft = JSON.parse(localStorage.getItem('flow_draft') || 'null');
  if (draft?.text) {
    editor.value = draft.text;
    btnClear.disabled = false;
    setSaveStatus('saved');
  }

  applyI18n();
  render();

  // 手机版默认关闭侧边栏，直接显示书写区
  if (window.innerWidth <= 768) {
    hideSidebar();
  }

  // 点击页面其他地方时关闭所有下拉菜单
  document.addEventListener('click', e => {
    if (!e.target.closest('.card-menu-wrap')) {
      document.querySelectorAll('.card-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
});