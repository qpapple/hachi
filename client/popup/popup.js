/**
 * Created by jeongjieun on 2017. 6. 12..
 */



// popup 템플릿 helpers에 팝업 불러와야지 팝업이 열리지
Template.popup.helpers({
    popupList : function(){
        //3. 팝업 불러오기
        return HachiPopups.find();
    }
});

// 팝업버튼을 누르면 no, yes 값을 콜백으로 넘겨서
// 각각 버튼이벤트에다가 이벤트 처리를 한다.
Template.popup.events({
    'click .btn_popup_close' : function(e, temp) {
        e.preventDefault();

        // 요거는 popups.js에서 만든 함수 호출,
        // 콜백값이 결과가 no
        this.callback(
            {
                result :"no"
            }
        );

        clearModal(this._id); // 팝업 아이디값을 어떻게 가지고 오는지 모르겠다  --> this로 가져온다
    },

    'click .btn_popup_yes' : function(e, temp) {
        e.preventDefault();

        this.callback({result :"yes"});

        clearModal(this._id);

    }
});


// popupItem 템플릿 helpers에 dynamicTemplate함수를 주는데 해당 템프릿 '이름'을 리턴해준다
Template.popupItem.helpers({
    dynamicTemplate: function() {
        return Template[this.name];
    }
});
