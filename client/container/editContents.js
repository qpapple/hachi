/**
 * Created by jeongjieun on 2017. 5. 25..
 */

Template.editContents.onRendered(function(){
    // 수정페이지에서도 포스트쓰는 페이지와 동일하게 글에디터 패키지(froala:editor)를 불러온다.
    $('#edit').froalaEditor();
});

Template.editContents.events({
    /*
    * 글쓰기 수정 완료 버튼을 누르면 수정된 값이 업데이트되어야 하는데
    * 우선 버튼 자체가 viewContents.js에서 글을 쓴 사용자만 수정, 삭제 버튼이 보이게끔 처리해놓았는데,
    * 한번 더 정확하게 하기 위해서
    * 해당템플릿의 사용자 아이디값과 === 접속한 Meteor.userId값을 비교해서 같다면 업데이트가 된다.
    * 이때, 글에디터가 태그모드일때는 수정이 안되서,  태그모드인지를 분별하는 if문을 만들고,
    * 수정한 title과 con값을 변수 _hachi에 저장해서
    * 업데이트 시켜준다.
    * 그리고 수정된 페이지로 이동 :: '+ 값 +'
    * */
    'click .btn_edit': function(e, temp){
        e.preventDefault();

        // 템플릿의 data의 hachi값을 변수에 담는다.
        var originalHachi = temp.data.hachi;

        //console.log(Meteor.user()._id,  temp.data.hachi.author.userId)
        //console.log($('#edit').froalaEditor('codeView.isActive'))

        // 해당템플릿의 사용자 아이디값과 === 접속한 Meteor.userId값을 비교해서 같다면
        if(originalHachi.author.userId == Meteor.userId()){

            // 글에디터가 태그모드라면, 태그모드를 끈다.
            if ( temp.$('#edit').froalaEditor('codeView.isActive') ) {
                $('#edit').froalaEditor('codeView.toggle');
            }

            // 수정한 title과 con값을 변수 _hachi에 저장
            var _hachi = {
                title : temp.$('#title').val(),
                con : temp.$('#edit').froalaEditor('html.get')
            };

            // 첫번째 {}는 검색값, 두번째 {}는 변경할 값
            Hachis.update({_id:temp.data.hachi._id} , {$set:{title : _hachi.title, con : _hachi.con}});

            // 수정하고 완료버튼누르면, 수정된 페이지로 돌아가기
            Router.go('/viewContents/'+temp.data.hachi._id+'');
        }
    }
});
