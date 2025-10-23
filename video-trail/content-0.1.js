/**
 * 新增已观看ep
 * @param {} dataKey
 */
function addWatchedEp(dataKey) {
  const bv = getBvIdFromUrl();
  chrome.storage.local.get(['watched'], res => {
    const eps = res.watched || [];
    if (!eps.includes(dataKey)) {
      eps.push(dataKey);
      chrome.storage.local.set({ watched: eps });
    }
  });
}

/**
 * 监听视频播放结束
 * @returns
 */
function listenForVideoEnd() {
  const video = document.querySelector('video');
  if (!video) {
    setTimeout(listenForVideoEnd, 1000);
    return;
  }

  video.addEventListener('ended', () => {
    const epId = getCurrentEpisodeId();
    if (epId) {
      addWatchedEp(epId);
    }
    setTimeout(updateWatchedPanel, 1500);
  });
}

/**
 * 查询数据库，修改dom显示
 */
// function markWatchedEpisodesInList() {
//   chrome.storage.local.get(["watched"], (res) => {
//     const watched = res.watched || [];
//     const epLinks = document.querySelectorAll("a[href*='ep']");

//     epLinks.forEach((a) => {
//       const match = a.href.match(/ep\d+/);
//       if (match && watched.includes(match[0])) {
//         if (!a.querySelector(".watched-marker")) {
//           const marker = document.createElement("span");
//           marker.textContent = " ✔已观看";
//           marker.className = "watched-marker";
//           marker.style.color = "#4CAF50";
//           marker.style.fontSize = "12px";
//           a.appendChild(marker);
//         }
//       }
//     });
//   });
// }
// function highlightWatchedEps() {
//   const bv = getBvIdFromUrl()
//   chrome.storage.local.get(["watched"], (res)=> {
//     const eps = res.watched || [];
//     console.log(`获取到已完成的ep: ${eps}`)

//     const episodeList = document.querySelector(".video-pod__list.multip.list");
//     if (!episodeList) return;

//     const items = episodeList.children;
//     for (let item of items) {
//       const key = item.getAttribute("data-key");
//       if (eps.has(key)) {
//         item.style.color = "green";
//       }
//     }
//   })
// }

function createWatchedListPanel() {
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '🎬 已观看列表';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.bottom = '20px';
  toggleBtn.style.right = '20px';
  toggleBtn.style.zIndex = '9999';
  toggleBtn.style.padding = '6px 10px';
  toggleBtn.style.backgroundColor = '#00a1d6';
  toggleBtn.style.color = 'white';
  toggleBtn.style.border = 'none';
  toggleBtn.style.borderRadius = '6px';
  toggleBtn.style.cursor = 'pointer';

  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.bottom = '60px';
  panel.style.right = '20px';
  panel.style.width = '220px';
  panel.style.maxHeight = '300px';
  panel.style.overflowY = 'auto';
  panel.style.backgroundColor = 'white';
  panel.style.border = '1px solid #ccc';
  panel.style.padding = '10px';
  panel.style.borderRadius = '6px';
  panel.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  panel.style.display = 'none';
  panel.style.zIndex = '9999';

  panel.id = 'watched-panel';

  toggleBtn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);

  updateWatchedPanel();
}
// 标记为已观看，并跳转到下一个视频
function markAsWatchedAndNext() {}

/**
 * 更新已观看列表
 */
function updateWatchedPanel() {
  chrome.storage.local.get(['watched'], res => {
    const watched = res.watched || [];
    const panel = document.getElementById('watched-panel');
    panel.innerHTML =
      "<strong>✔ 已观看集数</strong><ul style='padding-left: 16px;'>";
    const AllEPNodeList = document.querySelector(`.video-pod__list`).children;
    console.log('ceshi');
    for (const element of AllEPNodeList) {
      const datakey = element.getAttribute('data-key');
      console.log(datakey);
      if (watched.includes(datakey)) {
        const title = element.textContent;
        panel.innerHTML += `<li>${title}</li>`;
        element.children[0].children[1].style.color = 'green';
      }
    }
    panel.innerHTML += '</ul>';
  });
}
// * =================== Section: main ===================
function test() {}
// 初始化
listenForVideoEnd();
setTimeout(() => {
  createWatchedListPanel();
  updateWatchedPanel();
}, 1500);

test();
