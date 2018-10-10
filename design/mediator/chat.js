// // 参与者
// class Participant {
//   constructor(name){
//     this.name = name;
//     this.chatroom = null;
//   }
//   send(message, to) {
//     chatroom.send(message, this, to);
//   }
//   receive(message, from){
//     log.add(from.name + " to " + this.name + ": " + message);
//   }
// }

// //聊天室（中介者）
// const Chatroom = function() {
//   let participants = {};
//   return {
//       register: function(participant) {
//           participants[participant.name] = participant;
//           participant.chatroom = this;
//       },
//       send: function(message, from, to) {
//           if (to) {                   
//               to.receive(message, from);    
//           } else {                     
//               for (key in participants) {   
//                   if (participants[key] !== from) {
//                       participants[key].receive(message, from);
//                   }
//               }
//           }
//       }
//   };
// };

// //查看聊天记录
// const log = (function() {
//   let log = "";
//   return {
//       add: function(msg) { log += msg + "\n"; },
//       show: function() { 
//         console.log(log);
//         log = '';
//       }
//   }
// })();

// //使用
// function run() {
//   var yoko = new Participant("Yoko");
//   var john = new Participant("John");
//   var paul = new Participant("Paul");
//   var ringo = new Participant("Ringo");
//   var chatroom = new Chatroom();
//   chatroom.register(yoko);
//   chatroom.register(john);
//   chatroom.register(paul);
//   chatroom.register(ringo);
//   yoko.send("All you need is love.");
//   yoko.send("I love you John.");
//   // 应该根据to的id或者name进行私法 而不应该传入整个对象
//   john.send("Hey, no need to broadcast", yoko);
//   paul.send("Ha, I heard that!");
//   ringo.send("Paul, what do you think?", paul);
//   log.show();
// }
// run()
var obj = {
  a:1,
  b:2,
}
function a () {
  return 1;
}
console.log(a)