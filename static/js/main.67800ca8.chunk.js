(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{12:function(t,r,i){},13:function(t,r,i){},15:function(t,r,i){"use strict";i.r(r);var n=i(1),e=i.n(n),o=i(7),a=i.n(o),s=(i(12),i(4)),c=i(5),l=function(t){this.N=t,this.board=[];for(var r=0;r<this.N;r++){for(var i=[],n=0;n<this.N;n++)i.push(" ");this.board.push(i)}this.rows={player1:Array(this.N).fill(0),player2:Array(this.N).fill(0)},this.cols={player1:Array(this.N).fill(0),player2:Array(this.N).fill(0)},this.mainDiag={player1:0,player2:0},this.offDiag={player1:0,player2:0}};l.prototype.availableMoves=function(){for(var t=[],r=0;r<this.N;r++)for(var i=0;i<this.N;i++)" "===this.board[r][i]&&t.push({row:r,col:i});return t},l.prototype.isValidMove=function(t,r){return" "===this.board[t][r]},l.prototype.play=function(t,r,i){this.board[t][r]=i,this.rows["player".concat(i)][t]+=1,this.cols["player".concat(i)][r]+=1,t===r&&(this.mainDiag["player".concat(i)]+=1),t===this.N-1-r&&(this.offDiag["player".concat(i)]+=1)},l.prototype.evaluate=function(){var t=this;return this.isTerminal()?this.rows.player1.some((function(r){return r===t.N}))||this.cols.player1.some((function(r){return r===t.N}))||this.mainDiag.player1===this.N||this.offDiag.player1===this.N?1:this.rows.player2.some((function(r){return r===t.N}))||this.cols.player2.some((function(r){return r===t.N}))||this.mainDiag.player2===this.N||this.offDiag.player2===this.N?-1:0:null},l.prototype.isTerminal=function(){var t=this;return this.rows.player1.some((function(r){return r===t.N}))||this.cols.player1.some((function(r){return r===t.N}))||this.mainDiag.player1===this.N||this.offDiag.player1===this.N||this.rows.player2.some((function(r){return r===t.N}))||this.cols.player2.some((function(r){return r===t.N}))||this.mainDiag.player2===this.N||this.offDiag.player2===this.N||0===this.availableMoves().length},l.prototype.toString=function(){for(var t="",r=0;r<this.N;r++)t+=this.board[r].join(" | "),r!==this.N-1&&(t+="\n");return t},l.prototype.getBoardState=function(){return JSON.parse(JSON.stringify(this))},l.prototype.setBoardState=function(t){this.N=t.N,this.board=t.board,this.rows=t.rows,this.cols=t.cols,this.mainDiag=t.mainDiag,this.offDiag=t.offDiag};var h=new Map;l.prototype.minimax=function(t){if(h.has("".concat(t,"->").concat(this.toString())))return h.get("".concat(t,"->").concat(this.toString()));if(this.isTerminal())return{score:this.evaluate()};for(var r=this.availableMoves(),i=0;i<r.length;i++){var n=this.getBoardState(),e=r[i],o=e.row,a=e.col;this.play(o,a,t);var s=this.minimax(1===t?2:1).score;r[i].score=s,this.setBoardState(n)}for(var c=r[0].score,l=r[0],u=1;u<r.length;u++){var f=r[u].score;1===t?f>c&&(c=f,l=r[u]):f<c&&(c=f,l=r[u])}var p={move:{row:l.row,col:l.col},score:c};return h.set("".concat(t,"->").concat(this.toString()),p),p};var u=new l(3),f=(i(13),i(0));var p=function(){var t=Object(n.useState)([[" "," "," "],[" "," "," "],[" "," "," "]]),r=Object(c.a)(t,2),i=r[0],e=r[1],o=Object(n.useState)(null),a=Object(c.a)(o,2),l=a[0],h=a[1],p=Object(n.useState)(""),y=Object(c.a)(p,2),g=y[0],v=y[1],b=function(t,r){if(" "===i[t][r]&&null===l){for(var n=[],o=0;o<i.length;o++)n.push(Object(s.a)(i[o]));n[t][r]=1;var a=m(n);if(null!==a)e(n),h(a);else{var c=function(t){for(var r={player1:Array(3).fill(0),player2:Array(3).fill(0)},i={player1:Array(3).fill(0),player2:Array(3).fill(0)},n={player1:0,player2:0},e={player1:0,player2:0},o=0;o<3;o++)for(var a=0;a<3;a++)if(" "!==t[o][a]){var c=t[o][a];r["player".concat(c)][o]+=1,i["player".concat(c)][a]+=1,o===a&&(n["player".concat(c)]+=1),o===2-a&&(e["player".concat(c)]+=1)}for(var l=[],h=0;h<3;h++)l.push(Object(s.a)(t[h]));u.setBoardState({N:3,board:l,rows:r,cols:i,mainDiag:n,offDiag:e});var f=u.minimax(2).move;return{row:f.row,col:f.col}}(n);n[c.row][c.col]=2,e(n),null!==(a=m(n))&&(d(n),h(a))}}},m=function(t){for(var r=[0,0,0],i=[0,0,0],n=0,e=0,o=0,a=0;a<t.length;a++)for(var s=0;s<t[0].length;s++)if(" "!==t[a][s]){o+=1;var c=1===t[a][s]?1:-1;r[a]+=c,i[s]+=c,a===s&&(n+=c),a===2-s&&(e+=c)}return r.some((function(t){return 3===t}))||i.some((function(t){return 3===t}))||3===n||3===e?1:r.some((function(t){return-3===t}))||i.some((function(t){return-3===t}))||-3===n||-3===e?-1:9===o?0:null},d=function(t){console.log("highlightWinningCells()");for(var r=[0,0,0],i=[0,0,0],n=0,e=0,o=0;o<t.length;o++)for(var a=0;a<t[0].length;a++)if(" "!==t[o][a]){var s=1===t[o][a]?1:-1;r[o]+=s,i[a]+=s,o===a&&(n+=s),o===2-a&&(e+=s)}r.some((function(t){return-3===t}))?v("row".concat(r.findIndex((function(t){return-3===t})))):i.some((function(t){return-3===t}))?v("col".concat(i.findIndex((function(t){return-3===t})))):-3===n?v("mainDiag"):-3===e&&v("offDiag")},N=function(t,r){return"row"===g.substring(0,3)?t===Number(g.charAt(3)):"col"===g.substring(0,3)?r===Number(g.charAt(3)):"mainDiag"===g?t===r:"offDiag"===g&&t===2-r};return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)("h1",{children:"Tic Tac Toe"}),Object(f.jsx)("div",{className:"board",children:Object(f.jsx)("table",{children:Object(f.jsx)("tbody",{children:i.map((function(t,r){return Object(f.jsx)("tr",{children:t.map((function(t,i){return Object(f.jsx)("td",{style:{backgroundColor:""!==g&&N(r,i)?"gray":null,color:""!==g&&N(r,i)?"white":null},className:"cell",onClick:function(){b(r,i)},children:1===t?"X":2===t?"O":" "},"col".concat(i))}))},"row".concat(r))}))})})}),1===l&&Object(f.jsx)("h2",{children:"You win!"}),-1===l&&Object(f.jsx)("h2",{children:"You lose!"}),0===l&&Object(f.jsx)("h2",{children:"Tie!"}),null!==l&&Object(f.jsx)("button",{onClick:function(){return window.location.reload()},children:"Play again"})]})},y=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,16)).then((function(r){var i=r.getCLS,n=r.getFID,e=r.getFCP,o=r.getLCP,a=r.getTTFB;i(t),n(t),e(t),o(t),a(t)}))};a.a.render(Object(f.jsx)(e.a.StrictMode,{children:Object(f.jsx)(p,{})}),document.getElementById("root")),y()}},[[15,1,2]]]);
//# sourceMappingURL=main.67800ca8.chunk.js.map