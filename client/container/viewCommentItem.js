/**
 * Created by jeongjieun on 2017. 6. 1..
 */

/* commentItem : Template
 * helpers, events :: this == comment
 * 외는 this가 템플릿 :: this.data == comment
 * Template.instance() == onCreated, onRendered, onDestroyed 에서의 Template
 * */

Template.commentItem.onCreated(function(){
    // ReactiveVar :: 실시간 감지변수 (패키지아님), 문법 외우기
    this.commentEditMode = new ReactiveVar(false);
});

Template.commentItem.helpers({

    // 댓글수정, 댓글삭제 버튼은 댓글쓴 본인이면 보인다.
    isCommentUser : function(){
        if(this && this.author){
            return Meteor.userId() === this.author.userId ? true : false;
        }
    },

    /*
     * isCommentEdit 값이 true이면 수정할수있는 textarear와 수정버튼이 완료버튼으로 바뀌어져서 보인다.
     * 댓글수정버튼의 현재 값을 가지고 온다.
     * ReactiveVar를 상단에서 선언해줬기 때문에 가능
     * */
    isCommentEdit : function(){
        //console.log(Template.instance());

        // 문법 외우기
        return Template.instance().commentEditMode.get();
    }
});

Template.commentItem.events({
    /* 댓글 삭제 버튼
     * mongoDB에서도 삭제 됨
     * 댓글수 -1 을 연산해줌
     * */
    'click .btn_comment_delete' : function(e, temp){
        e.preventDefault();

        // 해당 댓글 아이디값이 삭제됨
        // 자동발행 안하므로 주석처리
        //Comments.remove(temp.data._id);
        // console.log('ㅁㅁ', temp, this); // this 값이 더 정확하다 왜? 근데 this값은 계속 변화된다.그래서 temp값으로 값을 찾는다.

        // 자동발행 안하고 발행법::
        var attr = temp.data._id;
        Meteor.call("commentRemove", attr , function(err, data){
            console.log(err);
            console.log(data);
        });

        // 부모템플릿 접근법 (암기)
        var parent = Template.parentData(1);
        //console.log(parent)

        // 3개 뎁스 들어가는거 if문 알지?
        if(parent && parent.hachi) {

            // 댓글 삭게하믄, 댓글수 - 1
            var _oldCount = parent.hachi.commentCount;


            // 자동발행 안하므로 주석처리
            // Hachis.update({_id:temp.data.hachiId}, {$set:{commentCount : _oldCount-1}});

            // 자동발행 안하고 발행법:: Hachi.js - commentCountUpdate 재사용
            var attr = {
                hachiId : temp.data.hachiId,
                commentCount  :  _oldCount-1
            };
            Meteor.call("commentCountUpdate", attr , function(err, data){
                console.log(err);
                console.log(data);
            });


        } else {
        }
    },

    /* 댓글 수정 버튼
     * 수정버튼을 누르면 commentEditMode가 true값이 된다.
     * 그리고 일정 시간 뒤에 포커스 이벤트가 간다.
     * */
    'click .btn_comment_edit' : function(e, temp) {
        e.preventDefault();
        /* 나의 방향::  수정버튼을 누르면 isCommentEdit값이 트루가 되면서, 수정이 완료로 바뀜,
         * 완료버튼을 누르면, isCommentEdit값이 펄스가 되면서, 완료가 수정으로 바뀜 */

        // commentEditMode 값이 true바뀜
        temp.commentEditMode.set(true);

        // 포커스 감
        setTimeout(function(){
            temp.$('.comment_edit').focus(); // 해당 값에 주고싶다 --> temp라고 줬으니까 해당값에 준것임
        }, 0);
    },

    /* 댓글 수정완료 버튼
     * 완료버튼을 누르면, commentEditMode가 false가 된다.
     * 수정된 textarea의 velue값을 mongoDB에 update 시킨다.
     * */
    'click .btn_comment_end' : function(e, temp) {
        e.preventDefault();

        temp.commentEditMode.set(false);
        // console.log(temp, temp.$('.comment_edit').val())

        // 자동발행안하므로 주석처리
        //Comments.update({_id:temp.data._id}, {$set:{comment : temp.$('.comment_edit').val()}});

        // 자동발행 안하고 발행법::
        var attr = {
            hachiId : temp.data._id,
            comment  : temp.$('.comment_edit').val()
        };
        Meteor.call("commentUpdate", attr , function(err, data){
            console.log(err);
            console.log(data);
        });
    }

});