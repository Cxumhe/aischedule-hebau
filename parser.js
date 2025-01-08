function scheduleHtmlParser(html) {
    let result = [];
    let message = "";
    try {
        let jsonData = JSON.parse(html);
        let $ = cheerio.load(jsonData.html);
        const range = (start, stop, step = 1) =>
            Array.from(
                { length: (stop - start) / step + 1 },
                (_, i) => start + i * step
            );
        $(".wut_container tbody tr").each(function (i, elem) {
            if (i > 0) {
                $(this)
                    .find("td")
                    .each(function (j, elem) {
                        if (j > 0 && elem.childNodes.length !== 0) {
                            $(this)
                                .find("div.mtt_item_kcmc ")
                                .each(function (k, elem) {
                                    const info =
                                        elem.childNodes[3].childNodes[0].data.split(
                                            ","
                                        );
                                    const classname = elem.childNodes[0].data;
                                    const position = info.pop();
                                    const teacher =
                                        elem.childNodes[1].childNodes[1]
                                            .childNodes[0].data;
                                    let weeks = [];
                                    info.filter(
                                        (item) => item[item.length - 1] === "周"
                                    ).forEach((item) => {
                                        const [start, stop] = item
                                            .slice(0, -1)
                                            .split("-")
                                            .map((item) => parseInt(item));

                                        weeks = weeks.concat(
                                            range(start, stop)
                                        );
                                    });
                                    result.push({
                                        name: classname, // 课程名称
                                        position: position, // 上课地点
                                        teacher: teacher, // 教师名称
                                        weeks: weeks, // 周数
                                        day: j, // 星期
                                        sections: [i, i + 1], // 节次
                                    });
                                });
                        }
                    });
            }
        });
    } catch (error) {
        console.log(error);
        message = error.message;
        result.push({
            name: "遇到错误,请加群:628325112,找开发者进行反馈",
            position: message,
        });
    }
    return result;
}