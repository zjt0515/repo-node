// * =================== Section: bili ===================
/**
 * 获取bv号
 * @returns
 */
function getBvIdFromUrl() {
  const match = window.location.href.match(/\/video\/(BV\w+)/);
  return match ? match[1] : null;
}

// * =================== Section:  bili-eps ===================
/**
 * 获取data-key
 * @returns
 */
function getCurrentEpisodeId() {
  const urlParams = new URLSearchParams(window.location.search);
  const p = parseInt(urlParams.get('p') || '0', 10); // 默认p=0

  const episodeList = document.querySelectorAll(
    '.video-pod__list.multip.list [data-key]'
  );
  if (episodeList.length === 0) return null;

  const index = p - 1;
  if (index < 0 || index >= episodeList.length) return null;

  return episodeList[index].getAttribute('data-key');
}
