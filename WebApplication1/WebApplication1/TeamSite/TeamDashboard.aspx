<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TeamDashboard.aspx.cs" Inherits="WebApplication1.TeamSite.TeamDashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Content/Dashboard.css" rel="stylesheet" />
</head>
<body>
<form id="form1" runat="server">

  
    <div class="dashboard-body">
        <div class="grid-wrapper">
            <h1>选择一个磁贴</h1>
            <div class="grid">
                <div class="tile-spaceHoder" coordinatex="0" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="1" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="2" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="3" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="4" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="5" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="6" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="7" coordinatey="0"></div>
                <div class="tile-spaceHoder" coordinatex="0" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="1" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="2" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="3" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="4" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="5" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="6" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="7" coordinatey="1"></div>
                <div class="tile-spaceHoder" coordinatex="0" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="1" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="2" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="3" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="4" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="5" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="6" coordinatey="2"></div>
                <div class="tile-spaceHoder" coordinatex="7" coordinatey="2"></div>
            </div>
            <div class="float-clear"></div>
        </div>
        <div class="action-wrapper">
            <a class="tile-create">&#x002b; 新建磁贴</a>
            <a class="tile-delete">&#xE014; 删除磁贴</a>
        </div>
        



        <div class="feature-area">
            <div class="feature-area-left">
                <div class="clipboard">
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                    <div class="tile-spaceHoder"></div>
                </div>
                <div class="float-clear"></div>
                <a href="javascript:void(0)" class="clipboard-clear">Clear all clipboard items</a>
            </div>
            <div class="feature-area-middle">
                <div class="mark"></div>
                <ul class="title-area">
                    <li>
                        <label>Title</label>
                    </li>
                    <li>
                        <input type="text" class="tile-tile" maxlength="50" />
                    </li>
                </ul>
                <ul class="size-area">
                    <li>
                        <label>Size</label>
                    </li>
                    <li style="position: relative;">
                        <div class="size-input collapse"></div>
                        <ul class="size-picker">
                            <li class="size-picker-sup collapse">&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                            <li>
                                <ul class="size-picker-sub">
                                    <li>&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;</li>
                                </ul>
                            </li>
                            <li class="size-picker-sup collapse">&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                &#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                            <li>
                                <ul class="size-picker-sub">
                                    <li>&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;</li>
                                </ul>
                            </li>
                            <li class="size-picker-sup collapse">&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                &#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                &#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                            <li>
                                <ul class="size-picker-sub">
                                    <li style="font-family:'Glyphicons Halflings'">&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE157;</li>
                                    <li>&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;<br />
                                        &#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;&#xE074;</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="background-color">
                    <li>
                        <label>
                            <input type="radio" name="background" checked="checked" class="color-radio" />
                            Background color
                        </label>
                    </li>
                    <li>
                        <div class="color-picker">
                            <div class="color-item" backgroundcolor="#FFFC9E">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#FFF100">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#FCD116">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#FFB900">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#FF8C00">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#DC3C00">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#DD5900">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#E81123">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#BA141A">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#F472D0">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#EC008C">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#B4009E">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#9B4F96">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#68217A">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#442359">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#4668C5">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#00188F">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#002050">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#6DC2E9">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#00BCF2">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#0072C6">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#00D8CC">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#00B294">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#008272">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#55D455">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#009E49">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#007233">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#BAD80A">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#7FBA00">
                                <div class="forSelected"></div>
                            </div>
                            <div class="color-item" backgroundcolor="#008A00">
                                <div class="forSelected"></div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="icon">
                    <li>Icon</li>
                    <li style="position: relative">
                        <div class="icon-input collapse" icon="None">None</div>
                        <div class="icon-picker">
                            <table>
                                <tr>
                                    <% for(int i=1; i<21;i++){
                                           string current =(i < 10) ? "00" + i.ToString() : "0"+i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                               <%--     <td icon="E002;">&#xE002;</td>
                                    <td icon="E042;">&#xE042;</td>
                                    <td icon="E062;">&#xE062;</td>
                                    <td icon="E044;">&#xE044;</td>
                                    <td icon="E046;">&#xE046;</td>
                                    <td icon="270f;">&#x270f;</td>
                                    <td icon="E102;">&#xE102;</td>
                                    <td icon="E111;">&#xE111;</td>
                                    <td icon="E116;">&#xE116;</td>
                                    <td icon="E123;">&#xE123;</td>--%>
                                </tr>
                                <tr>
                                         <% for(int i=21; i<41;i++){
                                           string current =(i < 10) ? "00" + i.ToString() : "0"+i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>

                                  <tr>
                                         <% for(int i=41; i<61;i++){
                                           string current =(i < 10) ? "00" + i.ToString() : "0"+i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>
                                  <tr>
                                         <% for(int i=61; i<81;i++){
                                           string current =(i < 10) ? "00" + i.ToString() : "0"+i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>
                                   
                                   <tr>
                                         <% for(int i=91; i<111;i++){
                                           string current =(i < 100) ? "0" + i.ToString() : i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>

                                    <tr>
                                         <% for(int i=111; i<131;i++){
                                           string current =(i < 100) ? "0" + i.ToString() : i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>
                                  <tr>
                                         <% for(int i=131; i<151;i++){
                                           string current =(i < 100) ? "0" + i.ToString() : i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>
                                 <tr>
                                         <% for(int i=151; i<171;i++){
                                           string current =(i < 100) ? "0" + i.ToString() : i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>
                                 <tr>
                                         <% for(int i=171; i<191;i++){
                                           string current =(i < 100) ? "0" + i.ToString() : i.ToString();
                                           Console.WriteLine(current);
                                           string str = string.Format("E{0};", current);
                                           %>
                                    <td icon="<%= str %>">&#x<%= str %></td>
                                    <%} %>
                                    
                                </tr>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="feature-area-right">
                <div class="mark"></div>
                <div class="tile-type">
                    <label>Type: <span class="label-tile-type">Static</span></label>
                   <label style="font-family:'Glyphicons Halflings'">&#x270f; Change type</label>
                </div>
                <ul class="background-image">
                    <li>
                        <label>
                            <input type="radio" name="background" class="image-radio" />
                            Background image
                        </label>
                    </li>
                    <li>
                </ul>
                <ul class="image-source">
                    <li>Image source
                    <label class="image-size"></label>
                    </li>
                    <li class="image-pickup">
                      <%--  <sharepointpublish:asseturlselector runat="server"
                            defaultopenlocationurl="Documents Library/"
                            pickerbuttontext="Browse" validateurl="false"
                            useimageassetpicker="false" defaulttolastusedlocation="false"
                            id="sourceURL" maxlength="1000" tooltip="File Name" clientcallback="function(){changedBackgroundImage();}" />--%>
                            <%--<input type="button" id="selectPic" value="选择图像"/>
                        <input type="text" class="filetobeupload"/>--%>
    
                        <input type="file" name="f" id="hiddenupload" onchange="URP.CustomizationTiles.changeTileBackgroundImage();"/>
                        
                    </li>
                </ul>
                <ul class="image-overlay">
                    <li>Image overlay color</li>
                    <li>
                        <label>
                            <input type="radio" class="overlay-white" name="image-overlay" value="White" />
                            White
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" class="overlay-black" name="image-overlay" checked="checked" value="Black" />
                            Black
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" class="overlay-none" name="image-overlay" value="None" />
                            None
                        </label>
                    </li>
                </ul>
                <ul class="show-count">
                    <li>Show report count</li>
                    <li>
                        <select>
                            <option value="None">None</option>
                            <option value="Centered">Centered</option>
                            <option value="Lower-right">Lower-right</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
        <hr style="clear: both;" />

           <div class="action-area">
        <a class="action-save action-disable">Save Dashboard</a>
        <a class="action-cancel">Cancel</a>
        <asp:HyperLink runat="server" ID="backTeamSite" Text="Cancel" CssClass="action-back"></asp:HyperLink>
    </div>
    </div>
    </form>
    <script src="../Scripts/jquery-1.10.2.min.js"></script>
    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script src="../Scripts/Dashboard.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
</body>
</html>
