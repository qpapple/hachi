/**
 * Created by jeongjieun on 2017. 5. 17..
 */

/*
 configure는 기본설정 값
 레이아웃 템플릿 : 내가 만든 layout
 로딩 템플릿 : 내가 만든 loading
 에러 템플릿 : 내가 만든 error
*/
Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'error'
});


/*
* 기본 주소값 /
* {{> yield}}가 가리키는게 mainContents템플릿
* data는 conList를 리턴한다.
* */
// 메인리스트 페이지
/* 이걸로 반복되므로 Route Controller */
HachiController = RouteController.extend({
    template : 'mainContents',
    increment: 5,
    limit : function() {
        var hachiLimit =  this.increment;

        if (this.params.query && this.params.query.hachiLimit) {
            hachiLimit = this.params.query.hachiLimit;
        }
        return parseInt(hachiLimit);
    },

    sort : function() {
        var hachiSort = {};
        //console.log(this.params.query.hachiSort)
        if (this.params.query && this.params.query.hachiSort) {
            //query.hachiOrder
            //같은 의미
           // hachiSort["submitted"] = -1;
           // hachiSort = {"submitted": -1};
            //hachiSort = {this.params.query.hachiSort: -1};

            hachiSort[this.params.query.hachiSort] = parseInt(this.params.query.hachiOrder || -1);
           console.log(hachiSort[this.params.query.hachiSort])
        } else {
            hachiSort['submitted'] = -1
        }
        return hachiSort;
    },
    findOption: function() {
        //{submitted: -1},
        return {sort: this.sort(), limit: this.limit()}
    },

    // search
    // 2 -> 3 publish.js
    search : function () {
        var _serchTxt = "";

        if (this.params.query && this.params.query.hachiSearch) {
            _serchTxt = this.params.query.hachiSearch;
        }

        return _serchTxt;

    },

    /* 이거는 더보기버튼 클릭할때 포커스가 상단으로 잡히므로,
    waitOn : function() {
        return Meteor.subscribe('hachiPublishList', this.search() ,this.findOption());
    },
    */

    /* 이렇게 바꾸고 아래 data에 ready 변수를 만든다 */
    subscriptions : function() {
        this.postsSub = Meteor.subscribe('hachiPublishList', this.search() ,this.findOption());
    },



    // morebtn 부분으로 인해 수정 및 추가, mainContents.js
    hachisList: function() {
      return Hachis.find({}, this.findOption());
    },
    data : function () {
        // morebtn 으로 인해 추가
        var moreBtn = this.hachisList().count() === this.limit();
        //var nextPath =this.route.path({hachiLimit: this.limit() + this.increment});
        //var nextPath = "?hachiLimit="+this.limit() + this.increment;
        return {
            ready: this.postsSub.ready, // 더보기버튼 ready변수만듬
            conList : this.hachisList(),
            nextHachiLimit : moreBtn ? (this.limit() + this.increment) : null
        };
    }
});

Router.route('/', {
    name:'mainContents',
    controller : HachiController

    /* 여기가 중복되는 구문이 있어서 위를 보믄
    // 구독
    // on the client
    waitOn : function() {
        var limit = parseInt(this.params.hachiLimit) || 3;
        return Meteor.subscribe('hachiPublishList', {sort: {submitted: -1}, limit: limit});
    },

    data: function() {
        var limit = parseInt(this.params.hachiLimit) || 3;
        return {
            conList : Hachis.find({}, {sort : {submitted:-1}, limit: limit})      // 첫번째는 검색대상{_id}, 두번재는 조건{submitted:-1} -1은 최근게시물 순으로 정렬됨됨
        };
    }
    */
});


// 포스트 글 쓰는 페이지
Router.route('/writeContents', {
    name: 'writeContents'
});


/*
* 주소줄에 :_id는 해당 게시물의 고유 id값을 자동으로 주소창에 뿌려준다.
* data는 hachi, commentList를 리턴해준다.
* hachi에서 findOne은 한개만 보여준다.
* commentList에서 fetch()는 사람눈에 보여지기 편하게끔 보여준다 (findOne에서 사용 못한다)
* */
// 뷰 페이지
Router.route('/viewContents/:_id', {
    name:'viewContents',


    // 하치아이템 구독
    // on the client
    // 여기값은 배열로 들어감
    waitOn : function() {
        return [
                Meteor.subscribe('hachiPublishItem', this.params._id),
                Meteor.subscribe('commentPublishList', this.params._id)
            ]
    },

    data: function() {
        return {
            hachi : Hachis.findOne({_id :this.params._id}),
            commentList : Comments.find({hachiId :this.params._id}, {sort : {submitted:-1}}).fetch() // array에만 fetch()
        }
    }
});

// 수정페이지
Router.route('/editContents/:_id', {
    name: 'editContents',

    // 밑에 hachi : Hachis.findOne({_id :this.params._id}) 참고
    waitOn : function() { return Meteor.subscribe('hachiPublishEdit', this.params._id); },


    data: function() {
        return {
            hachi : Hachis.findOne({_id :this.params._id})
        };
    }
});