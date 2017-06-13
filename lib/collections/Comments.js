/**
 * Created by jeongjieun on 2017. 5. 31..
 */

//*** Comments 컬렉션을 만든다. mogoDB에서는 hachiComments 만들어지지만, meteor에서는 Comments 사용한다. Comments는 포스트에 달린 댓글이다.
Comments = new Mongo.Collection('hachiComments');


Meteor.methods({
    // 댓글 :: Comments.insert(_comments); 참고 viewContents.js
    "commentInsert" : function(attr){
        var res = Comments.insert(attr);
        //형님 공부 안해쪄
        return res;
    },

    // 수정 :: Comments.update({_id:temp.data._id}, {$set:{comment : temp.$('.comment_edit').val()}}); 참고 viewCommentItem.js
    "commentUpdate" : function(attr){
        var res = Comments.update({_id : attr.hachiId}, {$set:{comment : attr.comment}});
        return res;
    },

    // 삭제 :: Comments.remove(temp.data._id); 참고 viewCommentItem.js

    "commentRemove" : function(attr){
        var res = Comments.remove(attr);
        return res;
    }
});