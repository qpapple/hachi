/**
 * Created by jeongjieun on 2017. 6. 12..
 */

//1. 팝업 컬렉션 만들기
// 클라이언트에서만 사용해서 여기다 콜렉션만듬
HachiPopups = new Meteor.Collection(null);



// 팝업콜렉션 인서트
throwPopup = function(option){
    //optiopn =
    /*{
        name:'deletePopup',
        callback : function(_data){
        }
    }*/

    //2. 팝업 생성
    HachiPopups.insert(option);
};

//팝업 클리어
clearModal = function(modalId){
    HachiPopups.remove({_id:modalId});
};


/*



//질문이 있고 yes or no 응답을 받아야 하는 단순 메세지 팝업
throwSimpleMessageChoosePopup = function(message, callback , isDelete, isCreationHelper){
    throwPopup({
        name:"simpleMessageChoosePopup",
        isDelete : isDelete || false,
        isCreationHelper : isCreationHelper || false,
        message:message,
        callback : function(data){
            if(callback){callback(data);}
        }
    });
}*/


/*
throwSimpleMessageChoosePopup("<strong>"+msg+"</strong></br>"+SYSTEM_POPUP_MESSAGE.라이브러리삭제, function(data){
    // //console.log(data);
    if(data.result == "ok"){
        Meteor.call("removeLibraryList",{
            library_idxs : CheckedLibraryIds.find().fetch().map(function(item){return item.library_idx}).join(","),
            group_idx : template.data.currentGroupId}, function(err, data){
            if(err){
                throwSimpleMessagePopup(errorCodeToMessage(err));
            }else{
                _.each(CheckedLibraryIds.find().fetch(), function(checkLibrary){
                    LibrariesForClient.remove({library_idx : checkLibrary.library_idx});
                });

            }
        })
    }

}, true);*/
