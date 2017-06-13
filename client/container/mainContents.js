/**
 * Created by jeongjieun on 2017. 5. 18..
 */

Template.mainContents.helpers({
    /* 로그인한 사람만 isLoggedIn값을 보여준다.
    * Meteor.userId()는 본인인지 체크하는 id값
    * */
    isLoggedIn : function(){
        return Meteor.userId();
    },

    // 클래스에 active주고싶을때 helpers에 인자로 받아서 사용할 수 있다(꿀이다.)
    // sortType이라는 인자는 바로 mainContents.html 에서 {{isActiveClass 'submitted'}} 이렇게 쓴 submitted 값을 받아온다.
    isActiveClass : function(sortType){
      //  console.log(sortType);

        // _query값에 Router.current().params.query를 담고,
        var _query = Router.current().params.query;

        // _query가 있고 _query.hachiSort값이 있으면, (hachiSort는 router.js에서 만들었고, 쿼리값에 날려주는 애
        if(_query && _query.hachiSort){
            // _query.hachiSort값이 == sortType과 같으면,
            if(_query.hachiSort == sortType){
                // active를 리턴해준다.
                return "active";
            }
        }else{
            // 기본값이 날짜순이므로, 날짜순이면
            if("submitted" == sortType) {
                // active를 리턴해준다.
                return "active";
            }
        }
    },

   /* isActiveSortClass : function (sortType) {

        // _query값에 Router.current().params.query를 담고,
        var _query = Router.current().params.query;
        if(_query && _query.hachiSort) {
            console.log('aa0')
            if (_query.hachiSort == sortType) {
                console.log('aa1')
                return "glyphicon-sort-by-attributes-alt"
            } else {
                return "glyphicon-sort-by-attributes"
            }
        } else {
            console.log('aa2')
            return "glyphicon-sort-by-attributes"
        }
        // 나는 궁금한게 이게 같은게 반복되는게 이상함 다시 생각할것



    },*/

    // search
    // 4 끝, 인풋박스에 검색하고 나면 검색한 값이 새로고침되면서 사라지기때문에 value 값에 검색한 값을 리턴해서 담아준다.
    search : function(){
        var _query = Router.current().params.query;

        if(_query && _query.hachiSearch){
            return _query.hachiSearch;
        }
    }
});

// more 버튼을 누르면 router.js에서 HachiController의 값을 받아서 보여준다.
// 그런데 쿼리값을 중첩해서 받아야하므로 왜냐하면 검색조건이 여러개일 경우가 있어서
Template.mainContents.events({
  'click .btn_more' : function (event, temp) {
      event.preventDefault();
      //Router.go ('contentList',{},{query: query})

      //1. 기존 URL 쿼리 값을 모두 가져온다.
      //2. hachiLimit 값을 추가한다.

      //Router.current().params.query
      /*var a = 1123;
      var b = {};
      b.a = 1;
      b.c = 2;
      console.log(b); //{a: 1, c : 2}*/

      // Router.current().params 값을 콘솔에 찍어보기 //[hash: null, query: Object]
      // Router.current().params.query 값을 콘솔에 찍어보기 // Object {hachiLimit: "20"}

      // 더보기 버튼을 누르고 이름, 날짜, 좋아요 순으로 추가로 검색하려고 만듬
      // _query에 현재 쿼리값을 담고 _query에 객체로 hachiLimit값을 담고
     // console.log(">>>>> click More btn");
      var _query = Router.current().params.query; //{hachiSort: "title"}
     // console.log(_query);
      _query.hachiLimit = temp.data.nextHachiLimit; //{hachiSort: "title", hachiLimit : temp.data.nextHachiLimit}
     // console.log(_query);

      // mainContents페이지의 쿼리값은 _query를 담는다.
      Router.go("mainContents",{},{query: _query});
  },
    'click .btn_sort' : function (event, temp) {
        event.preventDefault();

        //1. 기존 URL 쿼리 값을 모두 가져온다.
        //2. hachiSort 값을 추가한다.
        //console.log(">>>>> click Sort btn");
        // sortType에 이벤트 받는 최초대상의 data-type으ㄹ 담는다. router.js에서 사용한다.
        var sortType = $(event.currentTarget).attr("data-type");

        // _query에 현재 쿼리값을 담고
        var _query = Router.current().params.query; //{hachiSort: "title"}
        //console.log(_query); // {}

        // _query안에 객체로 hachiSort값을 담고
        _query.hachiSort = sortType; //{hachiSort: "title", hachiLimit : temp.data.nextHachiLimit}
        //console.log(_query);




        // 쿼리값에 sortType이 있는데 또 해당 버튼을 클릭해서 정렬하려고 하면,
        //console.log(_query ,_query.hachiSort,  sortType)
       // console.log(event.currentTarget)

        if($(event.currentTarget).hasClass('active')) {
            $(event.currentTarget).find('i').toggleClass('glyphicon-sort-by-attributes-alt');
            console.log(_query.hachiOrder);
            _query.hachiOrder = (_query.hachiOrder||-1)*-1;
        }

        /*if(_query.hachiSort == sortType) {
            // 정렬순서가 정순으로 정렬됨 + 클래스값이 glyphicon-sort-by-attributes-alt 로 바뀜
            console.log('1')
        }*/


        // mainContents페이지의 쿼리값은 _query를 담는다.
        // 결과는 {hachiSort: "submitted", hachiLimit: 20} 값이 쿼리에 담긴다
        Router.go("mainContents",{},{query: _query});



    },

    // search
    // 1 -> 2.router.js
    'keydown .search' : function (event, temp) {
        if(event.keyCode == 13) {
            var _search = temp.$('.search').val();
           // console.log(_search);


            // _query에 현재 쿼리값을 담고
            var _query = Router.current().params.query; //
           // console.log(_query); // {}

            // _query안에 객체로 hachiSearch 값을 담고
            _query.hachiSearch = _search; //{hachiSearch: _search}
           // console.log(_query); // _search

            // mainContents페이지의 쿼리값은 _query를 담는다.
            Router.go("mainContents",{},{query: _query});
        }
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