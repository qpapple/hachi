/**
 * Created by jeongjieun on 2017. 5. 18..
 */

//*** Hachis 컬렉션을 만든다. mogoDB에서는 hachiPosts로 만들어지지만, meteor에서는 Hachis로 사용한다. Hachis는 포스트를 뜻한다.
Hachis = new Mongo.Collection('hachiPosts');


// 자동발행 아니라서 새로 생성된 값 - 클라이언트에서 받아서 서버에서 db로 저장하는 함수
Meteor.methods({
    // 포스트
    "hachiInsert" : function(attr){
        var res = Hachis.insert(attr);
        return res;
    },

    // viewContents.js -> Hachis.update({_id:temp.data.hachi._id}, {$set:{like : _oldLike+1}}); 좋아요
    "likeUpdate" : function(attr){
        var res = Hachis.update({_id: attr.hachiId}, {$set:{like: attr.like}});
        return res;
    },

    // viewContents.js -> Hachis.update({_id:this.data.hachi._id}, {$set:{count : _oldCount+1}}); 페이지본수
    "countUpdate" : function (attr) {
        var res = Hachis.update({_id: attr.hachiId}, {$set:{count: attr.count}});
        return res;
    },

    // 수정페이지에서 입력 업데이트
    // 참고 edit.js - > Hachis.update({_id:temp.data.hachi._id} , {$set:{title : _hachi.title, con : _hachi.con}});
    "editUpdate" : function (attr) {
        var res = Hachis.update({_id: attr.hachiId}, {$set:{title: attr.title, con : attr.con}});
        return res;
    },


    // 포스트 삭제버튼
    // viewContents.js 참고 ::     "Hachis.remove(_hachi._id);"
    "hachiRemove" : function(attr) {
        var res = Hachis.remove(attr);
        return res;
    },

    // Hachis.update({_id:temp.data.hachi._id}, {$set:{commentCount : _oldCount+1}});
    // Hachis.update({_id:temp.data.hachiId}, {$set:{commentCount : _oldCount-1}}); 하나 만들어서 둘 다 사용
    "commentCountUpdate" : function(attr) {
        var res = Hachis.update({_id: attr.hachiId}, {$set:{commentCount: attr.commentCount}});
        return res;
    }




});



