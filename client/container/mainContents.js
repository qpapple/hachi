/**
 * Created by jeongjieun on 2017. 5. 18..
 */

Template.mainContents.helpers({
    /* 로그인한 사람만 isLoggedIn값을 보여준다.
    * Meteor.userId()는 본인인지 체크하는 id값
    * */
    isLoggedIn : function(){
        return Meteor.userId();
    }
});

Template.contentsItem.helpers({
    /* 이건 전역으로 날짜 받기 전에 해당페이지에만 있는줄 알고 쓴것
       changeSubmitted : function(){
       return moment(this.submitted).format("YYYY-MM-DD HH:mm:ss");
   },*/

    // 본인이 쓴 글이면 on클래스가 붙는다.
    userClass : function(){
        //console.log(Meteor.userId(), this.author.userId);
        return Meteor.userId() === this.author.userId ? 'on' : '';
    }
});