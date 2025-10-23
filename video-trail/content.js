import { VIDEO_TYPE } from './constant'

class MultiEpHandler {
  state = ''
  bvId = ''
  epId = ''
  stateList = {
    multiPart: {
      show() {},
      addWatched() {
        this.bvId = getBvIdFromUrl()
        chrome.storage.local.get([this.bvId], (res) => {
          // 观看完过，直接return
          if (eps.includes(res.watched)) return
          const eps = res.watched || []
          eps.push(dataKey)
          chrome.storage.local.set({ [this.bvId]: eps })
        })
      },
      updateWatched() {
        chrome.storage.local.get([bv], (res) => {
          const watched = res.watched || []
          const AllEPNodeList = document.querySelector(`.video-pod__list`).children
          for (const element of AllEPNodeList) {
            const datakey = element.getAttribute('data-key')
            if (watched.includes(datakey)) {
              element.children[0].children[1].style.color = 'green'
            }
          }
        })
      },
    },
    course: {
      addWatched() {
        this.bvId = getCourceName()
        chrome.storage.local.get([this.bvId], (res) => {
          // 观看完过，直接return
          if (eps.includes(res.watched)) return
          const eps = res.watched || []
          eps.push(dataKey)
          chrome.storage.local.set({ [this.bvId]: eps })
        })
      },
      updateWatched() {},
    },
  }
  setState(state) {
    this.state = state
  }
  run() {
    const video = document.querySelector('video')
    if (!video) {
      setTimeout(this.run, 1000)
      return
    }

    video.addEventListener('ended', () => {
      const epId = getCurrentEpisodeId()
      if (epId) {
        addWatchedEp(epId)
      }
      setTimeout(updateWatchedPanel, 1500)
    })
    // 根据状态运行
    this.stateList[this.state].updateWatched()
  }
}

/**
 * 获取class name
 */
function getCourceName() {}

/**
 * 获取data-key
 * @returns
 */
function getCurrentEpisodeId() {
  const urlParams = new URLSearchParams(window.location.search)
  const p = parseInt(urlParams.get('p') || '0', 10) // 默认p=0

  const episodeList = document.querySelectorAll('.video-pod__list.multip.list [data-key]')
  if (episodeList.length === 0) return null

  const index = p - 1
  if (index < 0 || index >= episodeList.length) return null

  return episodeList[index].getAttribute('data-key')
}

/**
 * 新增已观看ep
 * @param {} dataKey
 */
function addWatchedEp(dataKey) {
  const bv = getBvIdFromUrl()
  chrome.storage.local.get(['watched'], (res) => {
    const eps = res.watched || []
    if (!eps.includes(dataKey)) {
      eps.push(dataKey)
      chrome.storage.local.set({ watched: eps })
      console.log(`
        - ✅ 已标记 ${dataKey} 为已观看,
        - bv:${bv}
        - watched: ${eps}
        `)
    }
  })
}

/**
 * 监听视频播放结束
 * @returns
 */
function listenForVideoEnd() {
  const video = document.querySelector('video')
  if (!video) {
    setTimeout(listenForVideoEnd, 1000)
    return
  }

  video.addEventListener('ended', () => {
    const epId = getCurrentEpisodeId()
    if (epId) {
      addWatchedEp(epId)
    }
    setTimeout(updateWatchedPanel, 1500)
  })
}

function createWatchedListPanel() {
  const toggleBtn = document.createElement('button')
  toggleBtn.textContent = '🎬 已观看列表'
  toggleBtn.style.position = 'fixed'
  toggleBtn.style.bottom = '20px'
  toggleBtn.style.right = '20px'
  toggleBtn.style.zIndex = '9999'
  toggleBtn.style.padding = '6px 10px'
  toggleBtn.style.backgroundColor = '#00a1d6'
  toggleBtn.style.color = 'white'
  toggleBtn.style.border = 'none'
  toggleBtn.style.borderRadius = '6px'
  toggleBtn.style.cursor = 'pointer'

  const panel = document.createElement('div')
  panel.style.position = 'fixed'
  panel.style.bottom = '60px'
  panel.style.right = '20px'
  panel.style.width = '220px'
  panel.style.maxHeight = '300px'
  panel.style.overflowY = 'auto'
  panel.style.backgroundColor = 'white'
  panel.style.border = '1px solid #ccc'
  panel.style.padding = '10px'
  panel.style.borderRadius = '6px'
  panel.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)'
  panel.style.display = 'none'
  panel.style.zIndex = '9999'

  panel.id = 'watched-panel'

  toggleBtn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none'
  })

  document.body.appendChild(toggleBtn)
  document.body.appendChild(panel)

  updateWatchedPanel()
}

/**
 * 更新已观看列表
 */
function updateWatchedPanel() {
  chrome.storage.local.get(['watched'], (res) => {
    const watched = res.watched || []
    const panel = document.getElementById('watched-panel')
    panel.innerHTML = "<strong>✔ 已观看集数</strong><ul style='padding-left: 16px;'>"
    const AllEPNodeList = document.querySelector(`.video-pod__list`).children
    console.log('ceshi')
    for (const element of AllEPNodeList) {
      const datakey = element.getAttribute('data-key')
      console.log(datakey)
      if (watched.includes(datakey)) {
        const title = element.textContent
        panel.innerHTML += `<li>${title}</li>`
        element.children[0].children[1].style.color = 'green'
      }
    }
    panel.innerHTML += '</ul>'
  })
}

// 初始化
listenForVideoEnd()
setTimeout(() => {
  createWatchedListPanel()
  updateWatchedPanel()
}, 1500)

test()
