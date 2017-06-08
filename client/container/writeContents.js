/**
 * Created by jeongjieun on 2017. 5. 18..
 */


Template.writeContents.onRendered(function(){
    // 페이지 랜더링 된 다음에 글에디터 패키지(froala:editor)를 불러온다.
    $('#edit').froalaEditor();
});

Template.writeContents.events({
    /* 글쓰기 완료 버튼을 클릭하면,
    * Meteor.user()값을 변수에 저장하고,
    * 내가 필요한 값을 _hachi에 저장해서
    * mongoDB에 Hachis.insert(_hachi); 저장시켜줌
    * 그럼 어디서든 가져다 쓸 수 있다.
    * asdasdasd
    * */

    'click .btn_ok': function(e, temp){
        e.preventDefault();

        // Meteor.user()는 모든게 담기고, Meteor.userId()는 아이디값만 담긴다.
        var _user = Meteor.user();

        var _hachi = {
            commentCount : 0, // 댓글갯수인데, 이걸 왜 여기서 하나?
            count : 0,
            like : 0,
            title : temp.$('#title').val(),
            con : temp.$('#edit').froalaEditor('html.get'),  // 글에디터 내용 가져오는 방법
            author :{
                name : _user.profile.name,  // 페이스북 이름
                userId : _user._id          // 본인 고유아이디
            },
            submitted : new Date()
        };

        // 변수에 저장한 값들을 insert 시켜준다. 자동발행 안하므로 주석처리
        // Hachis.insert(_hachi);

        // autopublish 삭제로 ->> server에 올려서 db에 저장하도록
        // Hachi.js에서 저장한 값을 call한다.
        Meteor.call("hachiInsert", _hachi , function(err, data){
            console.log(err);
            console.log(data);
        });


        // 저장 한 다음 mainContents로 이동하라.
        Router.go('mainContents');
    },

    'click .btn-cancel' : function () {
        Router.go('mainContents');
    }
});

