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
Router.route('/', {
    name:'mainContents',

    data: function() {
        return {
            conList : Hachis.find({}, {sort : {submitted:-1}})      // 첫번째는 검색대상{_id}, 두번재는 조건{submitted:-1} -1은 최근게시물 순으로 정렬됨됨
        };
    }
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

    data: function() {
        return {
            hachi : Hachis.findOne({_id :this.params._id})
        };
    }
});