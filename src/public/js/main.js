
// Get Data User user_logined

var dataUserLogin

fetch(`/get-data-user/${Json_cookie.userId}`)
.then(response => {
    return response.json()
})
.then(data => {
    dataUserLogin = data
    console.log('data USER LOGIN Inside...', dataUserLogin)
    console.log('IS WALL.......... ', isWallPage)
    RunMainJS()
})
.catch(err=>{
    console.log('ERROR FTECH: ', err)
})
console.log('data ouside........', dataUserLogin)


function RunMainJS(){

    // Header JS
    // console.log('HEADER DATAass', Json_cookie)
    // $('.header-profile__name.last-name').html(Json_cookie.userName)
    // console.log('src avt', Json_cookie.avatar)
    // document.getElementById('header-avatar').setAttribute('src', dataUserLogin.avatar)
    // // Set Avatar for User Logined


    // // SearchBox Input : OnInput
    // $('#search-input').on('keydown', function (e) {
    //     console.log('key:', e.key)
    //     if (e.key == 'Enter') {
    //         console.log('EnterKey', this.value)
    //         inputValue = this.value
    //         inputValue = inputValue.toLowerCase().split(' ').join('-')
    //         console.log('SEARCHHH', inputValue)

    //         dataSearch = {
    //             data_search: inputValue
    //         }
    //         let path = `/search?key=${inputValue}`
    //         window.location.href = path
    //     }
    // })

    // // Click to Caret-down : show logout button
    // $('.header-right__item').click(function () {
    //     if (this.classList.contains('active')) {
    //         this.classList.remove('active')
    //     } else {
    //         this.classList.add('active')

    //     }
    // })
    // // document.querySelector('.header-right__item-more.header-right__setting').style.display = 'flex'
    // $('.setting-head__content-name.full-name').html(Json_cookie.userName)
    // document.querySelector('.setting-head__avatar').src = Json_cookie.avatar
    // $('.setting__item.nav-logout').click(function () {
    //     function delete_cookie(name) {
    //         document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //     }
    //     delete_cookie('user_logined')
    //     window.location.href = '/'
    //     console.log('JSON COKKIE DELETED 2', Json_cookie)
    // })

    // // Switch Mode button
    // $('.header-switch__box').click(function () {
    //     if (this.classList.contains('dark')) {
    //         this.classList.remove('dark')
    //         document.querySelector('.app').classList.remove('dark')
    //     } else {
    //         this.classList.add('dark')
    //         document.querySelector('.app').classList.add('dark')

    //     }
    // })

    // // User goto Wall-page button
    // $('.header-right__profile.nav-wall').click(function () {
    //     window.location.href = "/wall-page"
    // })

    // All Post Items...

    document.querySelector('.link-profile').href = `profile/${dataUserLogin.uid}`
    $('.user-name-text-logined').html(dataUserLogin.userName);
    
    // document.querySelector('.user-name-text').html(dataUserLogin.userName);

    // fetch API Posts
    console.log('iswallpage', isWallPage)
    if (isWallPage)
        PostApi = `/api/user-logined-posts/${Json_cookie.userId}`
    else
        PostApi = '/api/all-posts'

    async function CallApi() {
        await fetch(PostApi)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('DATA POST USER LOGIN', data)
                let posts_data = []
                data.map(item => {
                    // console.log( item.createdAt.toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: '2-digit'}))
                    console.log('item created', item.createdAt)
                    posts_data.push(item)
                })
                posts_data.reverse()
                return posts_data
            })
            .then((result) => {
                console.log(result)
                DisplayPostData(result)

            })
    }
    CallApi()

    function DisplayPostData(posts_data) {
        let likeStatus
        console.log('P??ST_DATA', posts_data)
        posts_data.map(item => {

            if (item.reactDetail.listLikeUser.includes(dataUserId)) {
                likeStatus = true
            } else {
                likeStatus = false
            }
            console.log('like Status', likeStatus)

            // Call ListComment API 


            let item_append = `
         <div class="newsfeed item-post" id="${item._id}">
             <div class="newsfeed__info">
                 <div class="newsfeed__info-profile">
                     <img class="newsfeed__-profile-avt"
                         src="${item.userInfo.avatar}">
                     <div class="newsfeed__info-profile-more">
                         <div class="newfeed_postId"> ${item._id}</div>

                         <span class="newsfeed__info-name">
                             ${item.userInfo.userName}
                         </span>
                         <div class="newsfeed__info-time">
                             ${item.createdAt}

                             <i class="fas fa-globe-europe"></i>
                         </div>
                     </div>
                 </div>
                 <div class="newsfeed__info-setting more-dots" style="display : ${item.uid === dataUserLogin.uid ? 'flex' : 'none'}">
                     <i class="fas fa-ellipsis-h"></i>
                     <ul class="newsfeed__info-setting-list" >
                         <li class="newsfeed__info-setting-item">
                             <div class="newsfeed__info-setting-item__img">
                                 <i class="fas fa-cloud-download"></i>
                             </div>
                             <div class="newsfeed__info-setting-item__content">
                                 <p class="newsfeed__info-setting-item__text">
                                     L??u b??i vi???t
                                 </p>
                                 <p class="newsfeed__info-setting-item__title">
                                     Th??m danh s??ch v??o m???c ???? l??u.
                                 </p>
                             </div>
                         </li>
                         <div>
                             <li class="newsfeed__info-setting-item">
                                 <div class="newsfeed__info-setting-item__img">
                                     <i class="fas fa-link"></i>
                                 </div>
                                 <div class="newsfeed__info-setting-item__content">
                                     <p class="newsfeed__info-setting-item__text">
                                         Nh??ng
                                     </p>
                                 </div>
                             </li>
                             <li class="newsfeed__info-setting-item">
                                 <div class="newsfeed__info-setting-item__img">
                                     <i class="far fa-bell"></i>
                                 </div>
                                 <div class="newsfeed__info-setting-item__content">
                                     <p class="newsfeed__info-setting-item__text">
                                         B???t th??ng b??o v??? b??i vi???t.
                                     </p>
                                 </div>
                             </li>
                             <li style="display: flex" class="newsfeed__info-setting-item edit-post">
                                 <div class="newsfeed__info-setting-item__img">
                                     <i class="fas fa-history"></i>
                                 </div>
                                 <div class="newsfeed__info-setting-item__content">
                                     <p class="newsfeed__info-setting-item__text">
                                         Ch???nh s???a b??i vi???t
                                     </p>
                                 </div>
                             </li>
                             <li style="display: flex" class="newsfeed__info-setting-item delete-post">
                                 <div class="newsfeed__info-setting-item__img">
                                     <i class="fas fa-trash-alt"></i>
                                 </div>
                                 <div class="newsfeed__info-setting-item__content">
                                     <p class="newsfeed__info-setting-item__text">
                                         Chuy???n v??o th??ng r??c
                                     </p>
                                     <p class="newsfeed__info-setting-item__title">
                                         C??c m???c trong th??ng r??c s??? b??? xo?? sau 30 ng??y.
                                     </p>
                                 </div>
                             </li>
                         </div>
                         <li class="newsfeed__info-setting-item">
                             <div class="newsfeed__info-setting-item__img">
                                 <i class="fas fa-ban"></i>
                             </div>
                             <div class="newsfeed__info-setting-item__content">
                                 <p class="newsfeed__info-setting-item__text">
                                     ???n b??i vi???t
                                 </p>
                                 <p class="newsfeed__info-setting-item__title">
                                     ???n b???t c??c b??i vi???t t????ng t???
                                 </p>
                             </div>
                         </li>
                     </ul>
                 </div>
             </div>

             <div class="newsfeed__content">
                 <p class="newsfeed__content-text">
                     ${item.content}
                 </p>
                 <img style="display: block" src="${item.img}" alt=""
                     class="newsfeed__content-img">
             </div>

             <div class="newsfeed__respond">
                 <div title="" style="display: flex" class="newsfeed__respond-react">
                     <div class="newsfeed__respond-react-icon">
                         <i class="fas fa-thumbs-up"></i>
                     </div>
                     <span class="newsfeed__respond-like-total" style="font-size: 14px">
                         ${item.reactNumber.likeNumber}
                     </span>
                 </div>
                 <div style="display: flex" class="newsfeed__respond-right">
                     <span class="newsfeed__respond-comment-total">${item.reactNumber.commentNumber} </span>
                     <span> b??nh lu???n </span>
                     <span> __ </span>
                     <span class="newsfeed__respond-share-total">${item.reactNumber.shareNumber}</span>
                     <span> chia s??? </span>

                 </div>
             </div>

             <ul data-index="" class="newsfeed__action">
                 <li
                     class="newsfeed__action-item reaction ${likeStatus ? 'active' : ''}">
                     <i class="fas fa-thumbs-up newsfeed__action-item-icon"></i>
                     <span class="newsfeed__action-item-text">Th??ch</span>
                 </li>
                 <li class="newsfeed__action-item comment-action">
                     <i class="far fa-comment-alt newsfeed__action-item-icon"></i>
                     <span class="newsfeed__action-item-text">B??nh lu???n</span>
                 </li>
                 <li class="newsfeed__action-item">
                     <i class="fas fa-share newsfeed__action-item-icon"></i>
                     <span class="newsfeed__action-item-text">Chia s???</span>
                 </li>
             </ul>

             <div class="newsfeed__comment">
                 <div class="newsfeed__comment-user">
                     <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png" alt="" class="nav-wall newsfeed__comment-img avt">
                     <div class="newsfeed__comment-box">
                         <input type="text" placeholder="Vi???t b??nh lu???n ..."
                             class="newsfeed__comment-input">
                         <div class="newsfeed__comment-box-right">
                             <div class="newsfeed__comment-box-icon test">
                                 <i class="far fa-laugh-beam"></i>
                             </div>
                             <div class="newsfeed__comment-box-icon">
                                 <i class="fas fa-camera"></i>
                             </div>
                             <div class="newsfeed__comment-box-icon send-comment" style="display: none">
                                 <i class="fas fa-paper-plane"></i>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="newsfeed__commented-box">
                     <div class="commented-switch">
                         <div class="show-hide-cmt commented-switch__text">
                             T???t c??? b??nh lu???n
                         </div>
                         <div class="commented-switch__text">
                             Ph?? h???p nh???t
                             <i class="fad fa-caret-down"></i>
                         </div>
                     </div>
                     <div class="commented-box">
                         
                     </div>     
                 </div>       
             </div>  
         </div>
        
         `
            $('.post-item').append(item_append)

        })
        // FUnction Get PostID via All ParentNode
        var getPostId = function (elem) {
            var parents = [];
            for (; elem && elem !== document; elem = elem.parentNode) {
                parents.push(elem);
            }
            var postItemClicked
            parents.map(itemParent => {
                if (itemParent.classList.contains('item-post')) {
                    // postIdClicked = itemParent.id
                    postItemClicked = itemParent
                    // console.log('postIDCliedk', postIdClicked)
                }

            })
            return postItemClicked
        }




        // Click to the Show Hide Comment
        $('.show-hide-cmt').click(async function (e) {




            let postId = getPostId(e.target).id
            let postItem = getPostId(e.target)
            console.log('postID....', postId)
            let HideShow = postItem.querySelector('.show-hide-cmt.commented-switch__text')
            await fetch(`/api/get-comments/${postId} `)
                .then((response) => {
                    console.log('FETCH API COMMET SUCESSFULLY', response)
                    return response.json()
                })
                .then(data => {
                    console.log('data json', data)
                    let CommentPostShow = getPostId(e.target).querySelector('.commented-box')
                    console.log('CommentPostShow', CommentPostShow)
                    if (CommentPostShow.classList.contains('active')) {
                        CommentPostShow.classList.remove('active')
                        HideShow.innerHTML = '???n b???t'
                    } else {
                        CommentPostShow.classList.add('active')
                        HideShow.innerHTML = 'T???t c??? b??nh lu???n'
                    }


                    let allComment = ''
                    data.map(comment_item => {
                        allComment +=
                            `<div class="commented-box__item">
                         <div class="commented-box__item-user">
                            <a class="link-profile" href="/profile/${comment_item.uid}">
                             <div class="commented-box__item-avatar">
                                 <img class="commented-box__item-avatar" src="${comment_item.avatar}"  alt="">
                             </div>
                             </a>
                             <div class="commented-box__item-info">
                                 <div class="wrap">
                                     <div class="comented-box__item-content">
                                         <div class="oninput">
                                             ${comment_item.userName}
                                         </div>
                                         <div class="comented-box__item-text">
                                             ${comment_item.comment}
                                         </div>
                                     </div>
                                 </div>
                                 <div class="commented-box__item-reaction" data-index="${comment_item.uid}">
                                     <span class=" commented-box__item-reaction--like">Th??ch</span>
                                     ???
                                     <span class="commented-box__item-reaction--respond">Ph???n h???i</span>
                                 </div>
                                 <div style="display:" class="commented-count-reaction">
                                     <i class="fas fa-thumbs-up"></i>
                                     <span>cmt.like</span>
                                 </div>
                             </div>
                             <div data-index="${comment_item.uid}" class="commented-box__item-delete" >
                                 <i class="fad fa-trash-alt"></i>
                             </div>
                         </div>
                     </div>    
                     `

                    })
                    CommentPostShow.innerHTML = allComment

                })
                .catch((error) => {
                    console.log("FETCH COMMENT- SERVER ERROR", error)
                })
        })

        // function get All Parents 


        // let FetchPostData = async function (apiUrl, data) {
        //     // console.log('data passed', data)
        //     post = {
        //         method: 'POST',
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8"
        //         },
        //         body: JSON.stringify(data)
        //     }
        //     await fetch(apiUrl, post)
        //         .then(dataFetch => {
        //             console.log('POST SENDED', dataFetch)
        //         })

        // }

        // Close Overlay button

        document.querySelectorAll('.post-box__head-close.close-box').forEach(close_btn => {
            close_btn.onclick = () => {
                document.querySelectorAll('.overplay').forEach(overlay => {
                    overlay.style.display = 'none';
                })
            }
        })
        
        // Click Send COmment
        document.querySelector('.item-post').onclick = function (e) {

            // Hide Show More Post Option
            console.log('target', e.target)
            if(e.target.classList.contains('more-dots') || e.target.parentElement.classList.contains('more-dots')){
                let moreBtn = e.target.closest('.more-dots')
                let moreList = moreBtn.querySelector('.newsfeed__info-setting-list')
                console.log('morelist', moreList)
                moreList.classList.toggle('active')
                
                // Delete Post btn
                console.log('2nd....', e.target)
                moreList.querySelector('.newsfeed__info-setting-item.delete-post').onclick = function (e){
                    document.querySelector('.modal-delete').style.display = 'block'
                    $('.delete-post-now').click(function(){
                        console.log('POSTCLIKED', getPostId(e.target))
                        document.querySelector('.modal-delete').style.display = 'none'
                        fetch(`/delete-post/${getPostId(e.target).id}`)
                        .then(result => {
                            if(result)
                                window.location.href='/home'
                        })
                        
                    })
                }
    
                 moreList.querySelector('.edit-post').onclick = function (e){
                    console.log('POST EDIT...', getPostId(e.target).id) 
                    let overlay_editpost = document.querySelector('.overplay.edit-post')
                    overlay_editpost.style.display = 'block'
                    let postId_Clicked = getPostId(e.target).id
                    posts_data.map(post_item=>{
                        if(post_item._id == postId_Clicked){
                            overlay_editpost.querySelector('.post-box__content-textarea').value = post_item.content
                            overlay_editpost.querySelector('.img-preview').src = post_item.img
                        }
                    })
    
                     // Submit Edit Post
                    document.querySelector('.form-submit-edit-post').onsubmit = function () {
                        this.action = `/edit-post/${postId_Clicked}`
                        this.method = 'post'
                    }
                }
            }
           
            let PostItemClicked = getPostId(e.target)
            let InputElementOnInputing = PostItemClicked.querySelector('.newsfeed__comment-input')

            let sentCmtBtn = PostItemClicked.querySelector('.send-comment')

            $('.newsfeed__comment-input').on('keydown', function (e) {
                console.log('ekey', e.key)
            })

            InputElementOnInputing.oninput = function () {
                console.log('20202', InputElementOnInputing.parentElement)
                sentCmtBtn.style.display = `${this.value === "" ? 'none' : 'flex'}`
                // Click to Send Comment Button

            }

            sentCmtBtn.onclick = function () {
                console.log('CLIKEDD??')
                let valueInputComment = InputElementOnInputing.value
                console.log('SENT CMT', valueInputComment)
                // Display Comment
                InputElementOnInputing.value = ''
                sentCmtBtn.style.display = 'none'
                let postIdClicked = PostItemClicked.id

                let commentData = {
                    postId: postIdClicked,
                    uid: dataUserId,
                    comment: valueInputComment
                }
                FetchPostData('/post-comment', commentData)
            }
        }


        postDataClicked = {}
        let listLikeUser

        $('.newsfeed__respond-react').click(function (e) {

            let postIdClicked = getPostId(e.target).id

            posts_data.map(item => {
                if (item._id === postIdClicked) {
                    console.log('p??t_datamap item', postIdClicked)
                    listLikeUser = item.reactDetail.listLikeUser
                }
            })

            console.log('lis like user', listLikeUser)
            let userItem = ''

            fetch('/api/get-user-display')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // console.log("FETCH DATA0", data)
                    data.map((data_item, index) => {
                        // console.log('Fetch item mapping',index)
                        if (listLikeUser.includes(data_item.uid)) {
                            console.log('Fetch item mathc', index, )

                            userItem += `
                             <li class="container-right__connect-item flex-roww">
                                <a href="/profile/${data_item.uid}" class="link-profile a-non-decor">
                                 <div class="left-section flex-roww">
                                     <span class="container-right__connect-item-avatar">
                                         <img src="${data_item.avatar}" alt="" class="container-right__connect-item-img">
                                     </span>
                                     <span class="container-right__connect-item-name">${data_item.userName}</span>
                                 </div>
                                 </a>
                                 <button type="button" class="btn btn-active" style="font-size:14px">Th??m b???n b??</button>
                             </li>
                             `
                        }
                    })
                    $('.list-user').html(userItem)


                })

            // ????? data xong r m???i display ra
            document.querySelector('.list-like').style.display = 'block'


        })




        // Handle Post Like Status
        console.log('POST DATA OUT', posts_data)

        function PostLikeStatus(user_id) {
            console.log('CHECK LIKE STAUS', user_id, posts_data)
            let likeStatus
            posts_data.map((post_item, index) => {
                console.log('mapping post item', index)
                if (post_item.reactDetail.listLikeUser.includes(user_id)) {
                    likeStatus = true
                    console.log('liks status', likeStatus)
                }
            })
        }

        PostLikeStatus(dataUserId)

        // })

        // handle click Like button
        $('.newsfeed__action-item.reaction').click(function (e) {

            var postItem = getPostId(e.target)
            var postId = getPostId(e.target).id
            let selector = postItem.querySelector('.newsfeed__respond-like-total')
            if (this.classList.contains('active')) {
                this.classList.remove('active')
                selector.innerHTML = (Number(selector.innerHTML) - 1)
                PostLikeAction({
                    postId: postId,
                    change: 'des',
                    userChange: dataUserId
                })
            } else {
                this.classList.add('active')
                selector.innerHTML = (Number(selector.innerHTML) + 1)
                PostLikeAction({
                    postId: postId,
                    change: 'inc',
                    userChange: dataUserId
                })
            }
            console.log('this', this)

        })

        let PostLikeAction = function (param) {
            console.log('param', param)
            option = {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(param)
            }
            fetch('/like-change', option)

        }
    }

    //===================================== LIST LIKE ==========================
    $('.overplay.list-like').click(function () {
        console.log('post data cloidcked', postDataClicked)

    })

    document.querySelector('#close-userlike-box').onclick = () => {
        document.querySelector('.overplay.list-like').style.display = 'none';
    }


    // Post New Box

    document.querySelector('.new-post-btn.posts__new-post-btn').onclick = () => {
        console.log('OVERLAY')
        document.querySelector('.overplay.post-new').style.display = 'block';
    }
    $('.avt posts__new-post-img nav-wall').src = Json_cookie.avatar
    document.querySelector('#avatar-postnew').src = Json_cookie.avatar


    function getCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res
    }


   // SHow Hide Option Post

   $('.newsfeed__info-setting.more-dots').click(function(){
    console.log('DATA USER LOGINED AVATAR................')

        document.querySelector('.newsfeed__info-setting-list').classList.add('active');
   })

    console.log('DATA USER LOGINED AVATAR................', dataUserLogin)
    // finally
    document.querySelectorAll('.avatar-img-logined').forEach(img => {
        img.src = dataUserLogin.avatar
    })
    
}