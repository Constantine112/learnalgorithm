res.sendfile = function (filepath) {
    fs.stat(filepath, function (err, stat) {
        var stream = fs.createReadStream(filepath)

        //设置内容
        res.setHeader('Content-type', mime.lookup(filepath))

        //设置长度
        res.setHeader('Content-length', stat.size)

        //设置为附件
        res.setHeader('Content-Disposition' + 'attachment; filename="' + path.basename(filepath) + '"')

        res.writeHeader(200)
        stream.pipe(res)
    })
}

