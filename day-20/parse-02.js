var tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g

const tt = `
<div class="container">
  <word-count limit="100">
    <h3>個人自介</h3>
    <textarea class="needcount" rows="10" placeholder="請輸入您的個人描述...">
    </textarea>
  </word-count>
</div>
<div class="footer"></div>
`

const w = tt.match(tagRE)
console.log(w)
