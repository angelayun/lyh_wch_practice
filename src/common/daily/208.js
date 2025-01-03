class Node {
  constructor() {
    this.son = new Array(26).fill(null);
    this.end = false;
  }
}
class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(word) {
    let cur = this.root;
    for (let c of word) {
      let index = c.charCodeAt() - 'a'.charCodeAt();
      if (cur.son[index] == null) {
        cur.son[index] = new Node();
      }
      cur = cur.son[index];
    }
    cur.end = true;
  }
  #find(word) {
    let cur = this.root;
    for (let c of word) {
      let index = c.charCodeAt() - 'a'.charCodeAt();
      if (cur.son[index] == null) {
        return 0;
      }
      cur = cur.son[index];
    }
    return cur.end ? 2 : 1;
  }
  startsWith(word) {
    return this.#find(word) != 0;
  }
  search(word) {
    return this.#find(word) == 2;
  }
}
