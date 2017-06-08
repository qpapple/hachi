/**
 * Created by jeongjieun on 2017. 6. 2..
 */

// 발행
Meteor.publish('hachiPublishList', function() {
    return Hachis.find({}, {sort : {submitted:-1}})
});

// 하치 아이템 발행
Meteor.publish('hachiPublishItem', function(hachiPublishId) {
   // console.log(hachiId)
    return Hachis.find({_id:hachiPublishId});
});

// 수정페이지 발행
Meteor.publish('hachiPublishEdit', function(hachiPublishId){
    return Hachis.find({_id :hachiPublishId})
    //참고 hachi : Hachis.findOne({_id :this.params._id})
});

// 커멘트 commentLi 내가 지은 이름
Meteor.publish('commentPublishList', function(hachiPublishId) {
    // console.log(hachiid)
    return Comments.find({hachiId:hachiPublishId});
    // 참고 Comments.find({hachiId :this.params._id}, {sort : {submitted:-1}}).fetch() // array에만 fetch()
});