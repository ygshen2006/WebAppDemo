<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TeamDashboard.aspx.cs" Inherits="WebApplication1.TeamSite.TeamDashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Content/Dashboard.css" rel="stylesheet" />
</head>
<body>
    <%--   <form id="form1" runat="server">
    <div>
    
    </div>
    </form>--%>
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
            <a class="tile-create">&#xE005; 新建磁贴</a>
            <a class="tile-delete">&#xE0CA; 删除磁贴</a>
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
                            <li class="size-picker-sup collapse">&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                            <li>
                                <ul class="size-picker-sub">
                                    <li>&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;</li>
                                </ul>
                            </li>
                            <li class="size-picker-sup collapse">&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                &#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                            <li>
                                <ul class="size-picker-sub">
                                    <li>&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;</li>
                                </ul>
                            </li>
                            <li class="size-picker-sup collapse">&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                &#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                &#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                            <li>
                                <ul class="size-picker-sub">
                                    <li>&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE003;</li>
                                    <li>&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;<br />
                                        &#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;&#xE002;</li>
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
                                    <td icon="&#xE000;">&#xE000;</td>
                                    <td icon="&#xE001;">&#xE001;</td>
                                    <td icon="&#xE002;">&#xE002;</td>
                                    <td icon="&#xE003;">&#xE003;</td>
                                    <td icon="&#xE004;">&#xE004;</td>
                                    <td icon="&#xE005;">&#xE005;</td>
                                    <td icon="&#xE006;">&#xE006;</td>
                                    <td icon="&#xE007;">&#xE007;</td>
                                    <td icon="&#xE008;">&#xE008;</td>
                                    <td icon="&#xE009;">&#xE009;</td>
                                    <td icon="&#xE00A;">&#xE00A;</td>
                                    <td icon="&#xE00B;">&#xE00B;</td>
                                    <td icon="&#xE00C;">&#xE00C;</td>
                                    <td icon="&#xE00D;">&#xE00D;</td>
                                    <td icon="&#xE00E;">&#xE00E;</td>
                                    <td icon="&#xE00F;">&#xE00F;</td>
                                    <td icon="&#xE010;">&#xE010;</td>
                                    <td icon="&#xE011;">&#xE011;</td>
                                    <td icon="&#xE012;">&#xE012;</td>
                                    <td icon="&#xE013;">&#xE013;</td>
                                </tr>
                                <tr>
                                    <td icon="&#xE000;">&#xE000;</td>
                                    <td icon="&#xE001;">&#xE001;</td>
                                    <td icon="&#xE002;">&#xE002;</td>
                                    <td icon="&#xE003;">&#xE003;</td>
                                    <td icon="&#xE004;">&#xE004;</td>
                                    <td icon="&#xE005;">&#xE005;</td>
                                    <td icon="&#xE006;">&#xE006;</td>
                                    <td icon="&#xE007;">&#xE007;</td>
                                    <td icon="&#xE008;">&#xE008;</td>
                                    <td icon="&#xE009;">&#xE009;</td>
                                    <td icon="&#xE00A;">&#xE00A;</td>
                                    <td icon="&#xE00B;">&#xE00B;</td>
                                    <td icon="&#xE00C;">&#xE00C;</td>
                                    <td icon="&#xE00D;">&#xE00D;</td>
                                    <td icon="&#xE00E;">&#xE00E;</td>
                                    <td icon="&#xE00F;">&#xE00F;</td>
                                    <td icon="&#xE010;">&#xE010;</td>
                                    <td icon="&#xE011;">&#xE011;</td>
                                    <td icon="&#xE012;">&#xE012;</td>
                                    <td icon="&#xE013;">&#xE013;</td>
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
                    <label style="font-family: 'Segoe UI Symbol'">&#xE2A9; Change type</label>
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
                        <input type="text" />
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
    <script src="../Scripts/jquery-1.10.2.min.js"></script>
    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/Dashboard.js"></script>
</body>
</html>
