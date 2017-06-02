/**
 * Created by jeongjieun on 2017. 5. 18..
 */

//*** Hachis 컬렉션을 만든다. mogoDB에서는 hachiPosts로 만들어지지만, meteor에서는 Hachis로 사용한다. Hachis는 포스트를 뜻한다.
Hachis = new Mongo.Collection('hachiPosts');



Meteor.methods({
    "hachiInsert" : function(attr){
        var res = Hachis.insert(attr);
        return res;
    }
})