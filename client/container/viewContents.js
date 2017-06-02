/**
 * Created by jeongjieun on 2017. 5. 25..
 */

Template.viewContents.events({
    /*
    * 글 삭제버튼을 누르면 이 템플릿이 가지고 있는 id값을 지워준다.
    * 페이지 삭제되고,
    * 목록 페이지로 이동함
    * */
    'click .btn_delete' : function(e, temp){
        e.preventDefault();

        var _hachi = temp.data.hachi;
        Hachis.remove(_hachi._id);

        Router.go('mainContents');
    },

    /* 좋아요 버튼
    * 좋아요 버튼을 누르면,
    * like값을 가지고 와서 like+1 값을 준다.
    * */
    'click .btn_like' : function(e, temp){
        e.preventDefault();

        //console.log(temp);

        // temp.data가 있고, temp.data.hachi가 있으면 :: 3가지 뎁스로 찾기 때문에 오류콘솔 뜰 수 있어서 이렇게 쓴다.
        if(temp.data && temp.data.hachi) {

            /* temp.data.hachi.like값이 있으면 가져와서 변수 _oldLike에 담고, 없으면 0을 담는다.
            * 그리고 여기서 참거짓값을 분멸하므로, if안에다 써준다. 밖에다 써주면, 뎁스 3개 오류로 인해 변수 담다가 페이지 오류난다
            * */
            var _oldLike = temp.data.hachi.like || 0;

            Hachis.update({_id:temp.data.hachi._id}, {$set:{like : _oldLike+1}});
        }
    },

    /* 댓글버튼
    * 댓글버튼으로 누르면, _comments변수에 필요한 값을 담고
    * Comments를 insert해준다. (writeContents.js 참고)
    * */
    'click .btn_comment' : function(e, temp){
        e.preventDefault();

        var _user = Meteor.user();

        //console.log(temp)
        //console.log(_user, temp, temp.$('.comment').val());

        var _comments = {
            comment : $('.comment').val(),
            author:{
                name : _user.profile.name,
                userId : _user._id
            },
            hachiId : temp.data.hachi._id,
            submitted : new Date()
        };

        Comments.insert(_comments);

        // 댓글 입력 버튼 누르고 쓴값이 댓글부분에 남아있어서 val값을 빈 값으로 준다.
        $('.comment').val("");


        /* 이것도 똑같이 temp.data가 있고, temp.data.hachi가 있다면
        * 변수 _oldCount값에 temp.data.hachi.commentCount값이 있으면 담고, 없으면 0을 담는다.
        * 그리고 commentCount(댓글갯수)를 +1씩 업데이트 시켜준다.
        * commentCount는 writeContents.js에 만들어줬는데 왜 거기다 만든지는 설명들어도 의문..
        * */
        if(temp.data && temp.data.hachi) {
            var _oldCount = temp.data.hachi.commentCount || 0;
            Hachis.update({_id:temp.data.hachi._id}, {$set:{commentCount : _oldCount+1}});
        } else {
        }
    }
});


/*
* Template.data.hachi
* helpers, events는 this가 => router의 데이타 :: this === Template.data :: this.hachi
* 외는 this가 => 템플릿 :: this === Template :: this.data.hachi
* */

Template.viewContents.helpers({

    /*
    * commentList에서 제일 첫번째 list만 클래스 first값을 주기위해
    * 반복문을 돌린다.
    * */
    commentList : function(){
        var _commentList = this.commentList;

        /* 반복문 문법 [배열], (배열의 요소가 하나하나 담긴다, index)
        _.each([array], function(item, index){
            console.log();
        }) */

        /* 외우기 */
        _.each(_commentList, function(comment, index){
            if(index === 0){
                comment.className = "first";
            }
        });

        return _commentList;
        /* 여기까지 */
    },

    // 글을 쓴 사용자 일때만 Meteor.userId값과 비교해서 일치하면 isUser값이 true가 되면서 수정, 삭제 버튼이 보여진다.
    isUser : function(){
        if(this.hachi && this.hachi.author){
            return Meteor.userId() === this.hachi.author.userId ? true : false;
        }
    }
});

Template.viewContents.onRendered(function () {
    // 페이지 카운트를 해당 페이지값(_id값)에 접근할 때 마다 1씩 증가시킴
    if(this.data && this.data.hachi) {
        var _oldCount = this.data.hachi.count || 0;
        Hachis.update({_id:this.data.hachi._id}, {$set:{count : _oldCount+1}});
    } else {
    }

    //set 문법 :: Hachis.update({_id:temp.data.hachi._id} , {$set:{title : _hachi.count, con : _hachi.con}});
});


