<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ArticlePreview.aspx.cs" Inherits="WebApplication1.TeamSite.ArticlePreview" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="../Content/register.css" rel="stylesheet" />
    <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <link href="../Content/article.css" rel="stylesheet" />
</head>
<body class="metro">
    <form id="form1" runat="server">
         
        <header class="bg-dark" style="position: relative">
            <div class="navigation-bar dark" style="width: 100%">
                <div class="navigation-bar-content container">
                    <a href="../Welcome.aspx" class="element"><span class="icon-grid-view" style="margin-right: 5px;"></span>Test Portal</a>
                    <span class="element-divider"></span>
                    <a class="element1 pull-menu" href="#"></a>
                    <ul class="element-menu">

                        <li>

                            <a href="#" class="dropdown-toggle">主页</a>
                            <ul class="dropdown-menu place-left dark" data-role="dropdown" data-show="hover">
                                <li><a href="#">网站概述</a></li>
                                <li><a href="#">联系我们</a></li>
                            </ul>

                        </li>
                        <li>

                            <a class="dropdown-toggle" href="#">企业中心</a>
                            <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                <li>
                                    <a href="#">活跃企业</a>
                                </li>
                                <li>
                                    <a href="#">最新企业</a>
                                </li>
                                <li class="teamsearch"><a href="#" class="dropdown-toggle">企业查找</a>

                                    <ul class="d-menu" data-role="dropdown">
                                        
                                    </ul>
                                </li>
                            </ul>


                        </li>
                        <li>
                            <a href="#" class="dropdown-toggle">个人中心</a>
                            <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                <li><a href="../Personal/MyCenter.aspx">我的收藏</a></li>
                                <li><a href="../Personal/MyCenter.aspx">我的关注</a></li>
                                <li><a href="../Personal/ProfileEdit.aspx">个人信息</a></li>
                            </ul>
                        </li>
                        
                        <li><a href="#" class="dropdown-toggle">管理中心</a>
                            <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                <li><a href="#">网站-新闻</a></li>
                            </ul>
                        </li>

                    </ul>
                    <div style="float: right; width: 20%" id="welcomeT">
                        <ul id="welcomezone" style="list-style: none">
                            <li style="color: white; float: left;" class="welcome">
                                <asp:LoginView ID="LoginView2" runat="server">
                                    <AnonymousTemplate>
                                        <div style="float: left;">
                                            <a id="register-link" class="user-name-link" href="../MyAccounts/Register.aspx?ReturnUrl='~/Welcome.aspx'">注册</a>
                                            <a id="login-link" class="user-name-link" href="#">登陆</a>
                                        </div>
                                    </AnonymousTemplate>
                                    <LoggedInTemplate>
                                        <div class="welcome-text">
                                            <span>欢迎: </span><a href="../Personal/MyCenter.aspx" class="user-name-link">
                                                <asp:LoginName ID="LoginName1" runat="server" />
                                            </a>
                                        </div>
                                    </LoggedInTemplate>
                                </asp:LoginView>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <article class="post-article" postid="40120" ptime="1417181174" posturl="http://www.pingwest.com/teambition-mobile/">
            <div class="post-img" style="background-image: url(http://cdn.pingwest.com/wp-content/uploads/2014/11/shutterstock_203490109.jpg)">
                <div class="overlay"></div>
                <div class="single-inner">
                    <div class="post-head">
                        <h1 class="title">移动办公这事靠谱吗？至少Teambition觉得它会成为重点</h1>
                    </div>
                    <div class="post-meta">
                        <div class="autor-meta">
                            <a class="autor" href="http://www.pingwest.com/author/cyzhou/">
                                <img src="http://cdn.pingwest.com/wp-content/uploads/2014/12/zcy1.jpg" alt="cyzhou" class="avatar avatar-30 wp-user-avatar wp-user-avatar-30 alignnone photo" width="30" height="30">
                                <span class="name">cyzhou</span>
                            </a>
                            <span class="post-time">2014-11-28</span>
                            <span class="post-category">
                                <a href="http://www.pingwest.com/category/tune/"><i class="icon-layout"></i>腔调 </a>
                            </span>
                        </div>
                        <div class="share-meta hidden-xs">
                            <ul>
                                <li><a href="http://service.weibo.com/share/share.php?appkey=761238391&amp;url=http://www.pingwest.com/teambition-mobile/&amp;ralateUid=2833534593&amp;title=【移动办公这事靠谱吗？至少Teambition觉得它会成为重点】&amp;pic=http://cdn.pingwest.com/wp-content/uploads/2014/11/shutterstock_203490109.jpg" target="_blank"><i class="icon-weibo"></i></a></li>
                                <li><a class="btn-weixin" href="javascript:;"><i class="icon-weixin"></i></a></li>
                                <li><a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fwww.pingwest.com%2Fteambition-mobile%2F&amp;title=%E7%A7%BB%E5%8A%A8%E5%8A%9E%E5%85%AC%E8%BF%99%E4%BA%8B%E9%9D%A0%E8%B0%B1%E5%90%97%EF%BC%9F%E8%87%B3%E5%B0%91Teambition%E8%A7%89%E5%BE%97%E5%AE%83%E4%BC%9A%E6%88%90%E4%B8%BA%E9%87%8D%E7%82%B9&amp;source=http%3A%2F%2Fwww.pingwest.com%2Fteambition-mobile%2F">
                                    <i class="icon-social-linkedin-outline"></i>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-inner single-pin-wrap">
                <div class="single-left">
                    <div class="single-box">
                        <div class="box-con">
                            <div id="sc-container" class="post-con sc-container">
                                <p>在今年七月份时，<a href="http://www.pingwest.com/demo/teambition-for-business/" target="_blank">PingWest曾报道过项目协作工具Teambition正在面向不同的行业定制工作流程</a>，不过随着用户花在移动设备上的时间越来越多，Teambition一样不想忽略移动用户对办公的需求。所以，接下来Teambition旗下的三款移动应用：<a href="https://www.teambition.com/" target="_blank">Teambition</a>、<a href="http://today.ai/" target="_blank">今天</a>和<a href="https://talk.ai/" target="_blank">简聊</a>都将得到不同程度的更新。</p>
                                <p>Teambition创始人齐俊元告诉PingWest，在今年7、8月份的时候他们开始意识到移动办公是一件比较重要的事情。以前大家也许会怀疑移动端在办公领域是否成立，但现在Teambition认为移动端一定会成为重点。这也是为何Teambition最近这段时间会连续推出iOS和Android共计6个版本的移动应用更新。</p>
                                <p>很多读者从PingWest之前的报道中或许已经知道Teambition是一款项目协作工具，但对今天和简聊可能就不怎么了解了。其实今天是一款面向个人用户的日程表，简聊则是面向团队的即时沟通工具。这三款产品分别对应用户在移动端的三类需求：追踪工作进展、查看重要事情安排和保持工作沟通。</p>
                                <p><a href="http://cdn.pingwest.com/wp-content/uploads/2014/11/Teambition1.jpg">
                                    <img class="alignnone size-full wp-image-40121" src="http://cdn.pingwest.com/wp-content/uploads/2014/11/Teambition1.jpg-700x0" alt="Teambition1" width="1824" height="1013"></a></p>
                                <p>其实，如果我们从移动端的视角看，Teambition应用本身已经是一个很复杂的产品了，对于一些简单的需求人们其实是没有动力在这上面去一步一步做选择的。所以像今天这样为个人用户准备的日程管理工具就出现。在Android版的今天中，由于其采用了Material Design的设计风格，用户可以很快地创建一个新事项。再加上其支持同步本地日历、同步Teambition日程、同步Evernote笔记等功能，所以用户可以很容易从这上面对自己的重要事情安排有个相应的了解。</p>
                                <p><a href="http://cdn.pingwest.com/wp-content/uploads/2014/11/Teambition3.jpg">
                                    <img class="alignnone size-full wp-image-40122" src="http://cdn.pingwest.com/wp-content/uploads/2014/11/Teambition3.jpg-700x0" alt="Teambition3" width="1706" height="1011"></a></p>
                                <p>简聊主要是为团队成员准备的即时沟通工具，它以团队和话题这两个主要维度来组织信息。一个用户可以属于多个团队，然后每个团队下面又可以有多个话题。在网页版上面，你还可以订阅来自微博、RSS、GitHub的等各类提醒。当然，如果你需要，也可以选择团队中的某个人单独沟通。</p>
                                <p>对于Teambition来说，这三款独立产品的一个聚合点就在于它们都是可以用一个Teambition帐号联通的。比如来说，你在Teambition上的日程安排是可以同步到今天上的，简聊中的联系人又是跟Teambition企业版同步的。</p>
                                <p>对于用户来说呢，你可能觉得这些产品还不够精致，这恐怕会是选择工具时的一个大障碍。举例来说，普通用户肯定只会选那些他觉得漂亮好用的产品，至于你的公司战略是什么，用户可能一点都不关心。从我个人的角度来看，今天和我经常用的<a href="http://www.pingwest.com/demo/let-sunrise-be-your-life-manager/">Sunrise</a>就还有一些差距，今天的Android版在设定日期和时间时也要比Android版的Google日历麻烦不少。对于这些问题，齐俊元觉得对于工具类产品来说，大家都需要一个迭代的过程才能变得美观易用，他们之前也认真研究过Sunrise，对方也是经过一系列迭代之后才发展到今天这个级别。</p>
                                <p>如果从大体上来看的话，移动办公基本可以划成两大类，一类是从移动端本身诞生的需求，另一类则是协同PC端延续过来的需求。所以Teambition的这些产品都是既有桌面版，又可以在移动设备上使用，不过现在她们打算在移动上花更多的精力了。</p>
                                <p>图片来自：<a href="http://download.shutterstock.com/gatekeeper/W3siZSI6MTQxNzE3ODIwNCwiYyI6Il9waG90b19zZXNzaW9uX2lkIiwiZGMiOiJpZGxfMjAzNDkwMTA5IiwicCI6InYxfDE4NDE1NTE0fDIwMzQ5MDEwOSIsImsiOiJwaG90by8yMDM0OTAxMDkvbWVkaXVtLmpwZyIsIm0iOiIxIiwiZCI6InNodXR0ZXJzdG9jay1tZWRpYSJ9LCIwbGdRNVhFWGpyS29NMXMzUW52OU55dU9NU1kiXQ/shutterstock_203490109.jpg">Shutterstock</a></p>
                                <!-- <div class="pic-by">题图来源：<span><a href="#" target="_blank">Shutterstock</a></span></div>-->
                            </div>
                            <div class="post-bottom">
                                <div class="post-tags">
                                    <a href="http://www.pingwest.com/tag/teambition/">Teambition</a><a href="http://www.pingwest.com/tag/%e4%bb%8a%e5%a4%a9/">今天</a><a href="http://www.pingwest.com/tag/%e7%ae%80%e8%81%8a/">简聊</a>
                                </div>

                                <div class="post-share">
                                    <button class="button btn-weibo" title="分享到微博">
                                        <a target="_blank" href="http://service.weibo.com/share/share.php?appkey=761238391&amp;url=http://www.pingwest.com/teambition-mobile/&amp;ralateUid=2833534593&amp;title=【移动办公这事靠谱吗？至少Teambition觉得它会成为重点】&amp;pic=http://pingwest.com/wp-content/uploads/2014/11/Teambition1.jpg">
                                            <i class="icon-weibo"></i>分享到微博
            </a>
                                    </button>
                                    <button class="button btn-weixin hidden-xs" title="分享到朋友圈">
                                        <i class="icon-weixin"></i>分享到微信
           
                                    </button>
                                    <button class="button btn-linkedin" title="分享到LinkedIn">
                                        <a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fwww.pingwest.com%2Fteambition-mobile%2F&amp;title=%E7%A7%BB%E5%8A%A8%E5%8A%9E%E5%85%AC%E8%BF%99%E4%BA%8B%E9%9D%A0%E8%B0%B1%E5%90%97%EF%BC%9F%E8%87%B3%E5%B0%91Teambition%E8%A7%89%E5%BE%97%E5%AE%83%E4%BC%9A%E6%88%90%E4%B8%BA%E9%87%8D%E7%82%B9&amp;source=http%3A%2F%2Fwww.pingwest.com%2Fteambition-mobile%2F">
                                            <i class="icon-social-linkedin-outline"></i>分享到LinkedIn
              </a>
                                    </button>
                                    <button class="button btn-more dropdown more-dropdown">
                                        <i class="icon-more"></i>
                                        <ul class="dropdown-menu">
                                            <li><a target="_blank" href="https://plus.google.com/share?url=http://www.pingwest.com/teambition-mobile/"><i class="icon-social-googleplus-outline"></i>Google Plus</a></li>
                                            <li><a target="_blank" href="https://twitter.com/intent/tweet?text=移动办公这事靠谱吗？至少Teambition觉得它会成为重点http://www.pingwest.com/teambition-mobile/"><i class="icon-social-twitter-outline"></i>Twitter</a></li>
                                            <li><a target="_blank" href="http://www.facebook.com/sharer.php?u=http://www.pingwest.com/teambition-mobile/&amp;t=移动办公这事靠谱吗？至少Teambition觉得它会成为重点"><i class="icon-social-facebook-outline"></i>Facebook</a></li>
                                            <li><a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http://www.pingwest.com/teambition-mobile/&amp;title=移动办公这事靠谱吗？至少Teambition觉得它会成为重点"><i class="icon-social-linkedin-outline"></i>Linkedin</a></li>
                                        </ul>
                                    </button>
                                </div>
                            </div>



                            <div class="post-comments-wrap">
                                <ul id="mkid" class="comment-list">
                                </ul>






                                <ul id="mkid" class="comment-list">


                                    <li id="" class="article-single-comment">
                                        <a class="comment-avatar" href="http://www.pingwest.com/teambition-mobile/comment-page-1/#comment-214522"></a><a class="comment-avatar" href="http://weibo.com/1407139332" rel="nofollow" target="_blank">
                                            <img alt="" src="http://tp1.sinaimg.cn/1407139332/50/0/1" class="avatar avatar-50" width="50" height="50"></a>
                                        <div class="comment-body">

                                            <p>大象的群聊，共享，也是移动办公的利器哦。</p>
                                            <div class="comment-meta">
                                                <span class="article-comment-author">LiChaopeng</span>
                                                <span class="article-comment-date">2014-11-28</span>
                                                <span class="comment-toggle">
                                                    <a class="article-comment-reply" href="/teambition-mobile/?replytocom=214522#respond" onclick="return addComment.moveForm(&quot;comment-214522&quot;, &quot;214522&quot;, &quot;respond&quot;, &quot;40120&quot;)"><i class="icon-reply"></i>回复</a>
                                                    <a class="article-share" target="_blank" href="http://service.weibo.com/share/share.php?appkey=761238391&amp;
                    url=http://www.pingwest.com/teambition-mobile/                    &amp;ralateUid=2833534593&amp;title=【移动办公这事靠谱吗？至少Teambition觉得它会成为重点】LiChaopeng:大象的群聊，共享，也是移动办公的利器哦。"><i class="icon-weibo"></i>分享</a>
                                                </span>

                                            </div>
                                        </div>

                                    </li>
                                    <!-- #comment-## -->
                                    <li id="" class="article-single-comment">
                                        <a class="comment-avatar" href="http://www.pingwest.com/teambition-mobile/comment-page-1/#comment-214493"></a><a class="comment-avatar" href="http://weibo.com/5313680795" rel="nofollow" target="_blank">
                                            <img alt="" src="http://tp4.sinaimg.cn/5313680795/50/0/1" class="avatar avatar-50" width="50" height="50"></a>
                                        <div class="comment-body">

                                            <p>会的，有钱的出钱，有力的出力！要建“平台”的建平台，要优化自己办公形式的就优化，反正都是迟早的事！高效，创意，智慧等等都将得到爆发。会很好的！找兼职的就找兼职，想赚钱的就赚钱，谁也不会管你是干嘛的，有能力就行。组团队的组团队！哎说不完啊！（会形成一个“生态系统”的）</p>
                                            <div class="comment-meta">
                                                <span class="article-comment-author">颠覆yiqie</span>
                                                <span class="article-comment-date">2014-11-28</span>
                                                <span style="display: inline;" class="comment-toggle">
                                                    <a class="article-comment-reply" href="/teambition-mobile/?replytocom=214493#respond" onclick="return addComment.moveForm(&quot;comment-214493&quot;, &quot;214493&quot;, &quot;respond&quot;, &quot;40120&quot;)"><i class="icon-reply"></i>回复</a>
                                                    <a class="article-share" target="_blank" href="http://service.weibo.com/share/share.php?appkey=761238391&amp;
                    url=http://www.pingwest.com/teambition-mobile/                    &amp;ralateUid=2833534593&amp;title=【移动办公这事靠谱吗？至少Teambition觉得它会成为重点】颠覆yiqie:会的，有钱的出钱，有力的出力！要建“平台”的建平台，要优化自己办公形式的就优化，反正都是迟早的事！高效，创意，智慧等等都将得到爆发。会很好的！找兼职的就找兼职，想赚钱的就赚钱，谁也不会管你是干嘛的，有能力就行。组团队的组团队！哎说不完啊！（会形成一个“生态系统”的）"><i class="icon-weibo"></i>分享</a>
                                                </span>

                                            </div>
                                        </div>

                                    </li>
                                    <!-- #comment-## -->
                                </ul>

                                <div class="pagination-comment">
                                </div>

                                <div class="article-comment-post">
                                </div>

                                <div class="comments-more">
                                    <a class="btn-comment button" href="javascript:;">查看其他 1 条评论</a>
                                </div>
                                <div class="comments-edit-area">
                                    <div class="comm-form clearfix">
                                        <div class="comment-avatar">
                                            <img alt="" src="http://www.pingwest.com/wp-content/uploads/2014/12/tim.png" class="avatar avatar-75 photo" width="75" height="75">
                                        </div>
                                        <div class="comm-con clearfix">
                                            <textarea name="comment" class="comm-area" placeholder="输入你的评论..."></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="post-other">
                                <div class="pt-single-area">

                                    <!-- <div class="pt-one">
        
        </div> -->
                                    <div class="pt-two">
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
                <!-- end -->



                <div class="single-right">
                    <div style="height: 581px;" class="pin-wrapper">
                        <div style="width: 350px;" class="single-side">
                            <div class="side-news">







                                <h2>你可能感兴趣的:</h2>
                                <ul class="side-list">
                                    <li>
                                        <a href="http://www.pingwest.com/lesschat-is-yet-another-slack/" target="_blank">工作沟通绕开微信？抓住这朵纷纷扰扰的“纷云”吧                         
                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.pingwest.com/teambition-launches-its-own-open-platform/" target="_blank">创业公司做平台，除了搭场地，你给第三方留出足够多的腾挪空间了吗？                         
                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.pingwest.com/how-does-brain-work-and-how-to-make-a-cooperating-platform/" target="_blank">透视人脑的“工作机制”，协作工具Teambition是如何设计产品的？                         
                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.pingwest.com/pwn-130606/" target="_blank">每日风险投资速递：团队协作工具Teambition获戈壁创投数百万元A轮投资                         
                        </a>
                                    </li>


                                </ul>

                            </div>


                            <div class="pt-side">
                                <a target="_blank" href="http://x.pingwest.com/product/product_single/60" onclick="ga('send', 'event', 'single-sidebar', 'click', 'yahoo-beijing-20150319');">
                                    <img src="http://pingwest.com/wp-content/uploads/2015/07/N1.jpg">
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img style="display: none;" class="wxshareimg" src="http://s.jiathis.com/qrcode.php?url=http://www.pingwest.com/teambition-mobile/?via=wechat_qr">
        </article>
    </form>
         <script src="../Scripts/jquery-1.8.2.min.js"></script>

    <script src="../Scripts/jquery.pin.js"></script>
        <script src="../Scripts/jquery.bpopup.min.js"></script>
        <script src="../Scripts/jquery.showLoading.js"></script>
        <script src="../js/jquery/jquery.widget.min.js"></script>
        <script src="../js/jquery/jquery.mousewheel.js"></script>
        <script src="../js/prettify/prettify.js"></script>
        <script src="../js/load-metro.js"></script>
        <script src="../js/docs.js"></script>
    <script src="../Scripts/navigation.js"></script>
        <script src="../Scripts/register.js"></script>
        <script src="../js/hitua.js"></script>
         <script src="../Scripts/HomePage.js"></script>
        <script type="text/javascript">
            var sessionUser = '<%= Session["UserName"]%>';

            (function (frontia, Reg, Home, Nav, $, undefined) {
                // Nav.util.test_login();
                var sessionUser = '<%= Session["UserName"]%>';
                //$('#loginqq').live('click', function (e) {
                //    Nav.util.loginWithThirdParty(frontia);
                //});

            })(window.Reg = window.Reg || {}, window.Nav = window.Nav || {}, $, undefined);

            $(document).ready(function () {
                //Home.Top.Init();

                $(function (frontia) {
                    Reg.Init();
                    Nav.Initiate(sessionUser);
                });
            });
        </script>


    <script type="text/javascript">
        $(function () {
            $(".single-right").pin({
                containerSelector: ".single-pin-wrap"
            })

        });
        


    </script>
</body>
</html>
