// leanCloud存储服务
var { Query, User } = AV;
AV.init({
    appId: "WpXtEU4ryfdtTTmPwQNvwMu3-MdYXbMMI",
    appKey: "AdKuhlznl7QdS9aCBvdN287c",
});

var TestObject = AV.Object.extend('MessageBorder');
var testObject = new TestObject();
testObject.set('words', 'Hello world!');
testObject.save().then(function (testObject) {
    console.log('保存成功。')
})