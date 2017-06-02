/**
 * Created by jeongjieun on 2017. 5. 26..
 */

/*
 전역변수로 사용할수 있게 해주는 registerHelper
 사용법은 humanizeTime변수명, submitted는 패키지 (momentjs:moment)를 깔고 난 다음, 포스트가 생성되는 writeContents.js페이지에서 submitted 변수를 만든것
 */
Template.registerHelper("humanizeTime", function(submitted){
    //return moment(submitted).fromNow();  현재시간을 나타냄
    return moment(submitted).format("YYYY-MM-DD HH:mm:ss"); // 년-월-일 시:분:초 - 커스텀해서 사용 가능
});