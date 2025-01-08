async function scheduleHtmlProvider(
    iframeContent = "",
    frameContent = "",
    dom = document
) {
    await loadTool("AIScheduleTools");
    await AIScheduleAlert(`需要自行设置"开始上课时间"`);
    return JSON.stringify({
        html: dom.querySelector("iframe").contentWindow.document.body.innerHTML,
    });
}