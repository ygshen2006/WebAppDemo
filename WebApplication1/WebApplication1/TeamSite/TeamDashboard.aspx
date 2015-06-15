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
                                        <li style="font-family: 'Glyphicons Halflings'">&#xE074;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;&#xE157;<br />
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
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-shield-star">
                                                <use xlink:href="../css/sprite.svg#si-glyph-shield-star" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bubble-message-hi">
                                                <use xlink:href="../css/sprite.svg#si-glyph-bubble-message-hi" />
                                            </svg>

                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-android">
                                                <use xlink:href="../css/sprite.svg#si-glyph-android" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-ambulance">
                                                <use xlink:href="../css/sprite.svg#si-glyph-ambulance" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bubble-message">
                                                <use xlink:href="../css/sprite.svg#si-glyph-bubble-message" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bluetooth">
                                                <use xlink:href="../css/sprite.svg#si-glyph-bluetooth" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-calendar-empty">
                                                <use xlink:href="../css/sprite.svg#si-glyph-calendar-empty" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-briefcase-person">
                                                <use xlink:href="../css/sprite.svg#si-glyph-briefcase-person" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bolt">
                                                <use xlink:href="../css/sprite.svg#si-glyph-bolt" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-circle-triangle-right">
                                                <use xlink:href="../css/sprite.svg#si-glyph-circle-triangle-right" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-zoom-in">
                                                <use xlink:href="../css/sprite.svg#si-glyph-zoom-in" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-ying-yang">
                                                <use xlink:href="../css/sprite.svg#si-glyph-ying-yang" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-wood-stove">
                                                <use xlink:href="../css/sprite.svg#si-glyph-wood-stove" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-window">
                                                <use xlink:href="../css/sprite.svg#si-glyph-window" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-wheel-chair">
                                                <use xlink:href="../css/sprite.svg#si-glyph-wheel-chair" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-webcam">
                                                <use xlink:href="../css/sprite.svg#si-glyph-webcam" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-watch">
                                                <use xlink:href="../css/sprite.svg#si-glyph-watch" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-view">
                                                <use xlink:href="../css/sprite.svg#si-glyph-view" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-umbrella-open">
                                                <use xlink:href="../css/sprite.svg#si-glyph-umbrella-open" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-turn-off">
                                                <use xlink:href="../css/sprite.svg#si-glyph-turn-off" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-truck">
                                                <use xlink:href="../css/sprite.svg#si-glyph-truck" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-trumpet">
                                                <use xlink:href="../css/sprite.svg#si-glyph-trumpet" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-truck">
                                                <use xlink:href="../css/sprite.svg#si-glyph-truck" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-trolley-error">
                                                <use xlink:href="../css/sprite.svg#si-glyph-trolley-error" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-trees">
                                                <use xlink:href="../css/sprite.svg#si-glyph-trees" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-tree">
                                                <use xlink:href="../css/sprite.svg#si-glyph-tree" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-trash">
                                                <use xlink:href="../css/sprite.svg#si-glyph-trash" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-tennis-racket-ball">
                                                <use xlink:href="../css/sprite.svg#si-glyph-tennis-racket-ball" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-test-tube-empty">
                                                <use xlink:href="../css/sprite.svg#si-glyph-test-tube-empty" />
                                            </svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-text-search">
                                                <use xlink:href="../css/sprite.svg#si-glyph-text-search" />
                                            </svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-television"><use xlink:href="../css/sprite.svg#si-glyph-television" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-telescope"><use xlink:href="../css/sprite.svg#si-glyph-telescope" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-tea-cup"><use xlink:href="../css/sprite.svg#si-glyph-tea-cup" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-targer"><use xlink:href="../css/sprite.svg#si-glyph-targer" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-tank"><use xlink:href="../css/sprite.svg#si-glyph-tank" /></svg>
                                        </td>
                                        <td>
                                         <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-star-stick"><use xlink:href="../css/sprite.svg#si-glyph-star-stick" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-star-cross"><use xlink:href="../css/sprite.svg#si-glyph-star-cross" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-sound"><use xlink:href="../css/sprite.svg#si-glyph-sound" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-space-ship"><use xlink:href="../css/sprite.svg#si-glyph-space-ship" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-spanner"><use xlink:href="../css/sprite.svg#si-glyph-spanner" /></svg>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-spoon-fork"><use xlink:href="../css/sprite.svg#si-glyph-spoon-fork" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-spray"><use xlink:href="../css/sprite.svg#si-glyph-spray" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-square-delicious"><use xlink:href="../css/sprite.svg#si-glyph-square-delicious" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-square-four"><use xlink:href="../css/sprite.svg#si-glyph-square-four" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-scissor-line-cut"><use xlink:href="../css/sprite.svg#si-glyph-scissor-line-cut" /></svg>
                                        </td>
                                        <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-safe-pin"><use xlink:href="../css/sprite.svg#si-glyph-safe-pin" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-pin-location-2"><use xlink:href="../css/sprite.svg#si-glyph-pin-location-2" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-pill"><use xlink:href="../css/sprite.svg#si-glyph-pill" /></svg>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-person-plus"><use xlink:href="../css/sprite.svg#si-glyph-person-plus" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-mail-inbox"><use xlink:href="../css/sprite.svg#si-glyph-mail-inbox" /></svg>
                                        </td>
                                    </tr>
                                      <tr>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-globe"><use xlink:href="../css/sprite.svg#si-glyph-globe" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-hammer-and-wrench"><use xlink:href="../css/sprite.svg#si-glyph-hammer-and-wrench" /></svg>
                                        </td>
                                        <td>
                                         <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-heart"><use xlink:href="../css/sprite.svg#si-glyph-heart" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-hand"><use xlink:href="../css/sprite.svg#si-glyph-hand" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-golf-flag"><use xlink:href="../css/sprite.svg#si-glyph-golf-flag" /></svg>
                                        </td>
                                        <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-head"><use xlink:href="../css/sprite.svg#si-glyph-head" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-head-set"><use xlink:href="../css/sprite.svg#si-glyph-head-set" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-game-1"><use xlink:href="../css/sprite.svg#si-glyph-game-1" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-call"><use xlink:href="../css/sprite.svg#si-glyph-call" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-baby"><use xlink:href="../css/sprite.svg#si-glyph-baby" /></svg>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td>
                                         <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-cloud-rain-heavy-rain"><use xlink:href="../css/sprite.svg#si-glyph-cloud-rain-heavy-rain" /></svg>
                                        </td>
                                        <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-circle-help"><use xlink:href="../css/sprite.svg#si-glyph-circle-help" /></svg>
                                        </td>
                                        <td>
                                         <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-checked"><use xlink:href="../css/sprite.svg#si-glyph-checked" /></svg>
                                        </td>
                                        <td>
                                         <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-chart-piece"><use xlink:href="../css/sprite.svg#si-glyph-chart-piece" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-chart-column"><use xlink:href="../css/sprite.svg#si-glyph-chart-column" /></svg>
                                        </td>
                                        <td>
                                       <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-chart-column-decrease"><use xlink:href="../css/sprite.svg#si-glyph-chart-column-decrease" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bicycle-1"><use xlink:href="../css/sprite.svg#si-glyph-bicycle-1" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bookmark"><use xlink:href="../css/sprite.svg#si-glyph-bookmark" /></svg>
                                        </td>
                                        <td>
                                           <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-biscuit"><use xlink:href="../css/sprite.svg#si-glyph-biscuit" /></svg>
                                        </td>
                                        <td>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-bookcase"><use xlink:href="../css/sprite.svg#si-glyph-bookcase" /></svg>
                                        </td>
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
                        <label style="font-family: 'Glyphicons Halflings'">&#x270f; Change type</label>
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

                            <input type="file" name="f" id="hiddenupload" onchange="URP.CustomizationTiles.changeTileBackgroundImage();" />

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

         <div class="popupWindow">
        <h1>选择磁贴查询条件</h1>
        <select class="select-tileType">
            <option value="Selected">特定的</option>
            <option value="Filtered">按条件过滤</option>
            <option value="Tagged">依照标选择</option>
        </select>
        <div class="reportListAjaxData" style="">
            <div class="Static"></div>
            <div class="Selected"></div>
            <div class="Filtered"></div>
            <div class="Tagged"></div>
        </div>
        
        <div class="ajaxButtons">
            <input class="popupSave" type="button" value="Save" />
            <input class="popupCancel" type="button" value="Cancel" />
        </div>
    </div>
    </form>
    <script src="../Scripts/jquery-1.10.2.min.js"></script>
    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script src="../Scripts/Dashboard.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
</body>
</html>
