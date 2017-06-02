/**
 * Created by jeongjieun on 2017. 5. 31..
 */

//*** Comments 컬렉션을 만든다. mogoDB에서는 hachiComments 만들어지지만, meteor에서는 Comments 사용한다. Comments는 포스트에 달린 댓글이다.
Comments = new Mongo.Collection('hachiComments');