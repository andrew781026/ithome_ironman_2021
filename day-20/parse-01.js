function parse(html) {

  const tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g

  const result = html.match(tagRE);

  return result
}

// 從 bootstrap 5 擷取出來的測試 html :
// 來源 : https://getbootstrap.com/docs/5.0/forms/overview/#overview
const tt = `
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`

const arr = parse(tt)
console.log('matchArr=', arr)
