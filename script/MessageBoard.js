// leanCloud存储服务
var { Query, User } = AV;
AV.init({
    appId: "WpXtEU4ryfdtTTmPwQNvwMu3-MdYXbMMI",
    appKey: "AdKuhlznl7QdS9aCBvdN287c",
});



function saveMessage(text,author){
    var MessageBorder = AV.Object.extend('MessageBorder');
    var message = new MessageBorder();
    message.set('text', text);
    message.set('author', author);
    let date=new Date();
    message.set('date', date);
    message.save().then(function (message) {
        console.log('留言保存成功。')
    })
}

function loadMessage(){
    var query = new AV.Query('MessageBorder');
    query.limit(5);
    query.descending('createdAt');
    query.find().then(function (messages) {
        for (let message of messages){
            appendMessage(message.attributes.text,message.attributes.author,message.attributes.date)
        }
    });
}

function appendMessage(message, name, date) {
    let newMessage=document.createElement('li');
    newMessage.innerHTML=`
        <div class="message">
                    <div class="messageText"><span>${message}</span></div>
                    <div class="messageStatics">
                        <div><span>Name: </span><span>${name}</span></div>
                       <div><span>Time: </span><span>${"0"+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()}</span></div> 
                    </div>`
    document.getElementById("messageDisplay").appendChild(newMessage)

}
let messageForm=document.getElementById("messageForm");
messageForm.onsubmit=function(event){
    event.preventDefault();
    let form=event.target;
    let name=form[0].value;
    let message=form[1].value;
    if(message){
        saveMessage(message,name);
        appendMessage(message,name,new Date());
    }else {
        alert("不要调戏网页，不输入留言就提交是不对的。")
    }
}
loadMessage();
