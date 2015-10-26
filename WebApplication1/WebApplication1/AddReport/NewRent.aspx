<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewRent.aspx.cs" Inherits="WebApplication1.AddReport.NewRent" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Content/newTab.css" rel="stylesheet" />
</head>
<body dir="&locale.dir;">
27   <div id="newtab-customize-overlay"></div>
28 
    <form id="test" runat="server">
   <div class="newtab-customize-panel-container">
      <div id="newtab-customize-panel" orient="vertical">
          <div id="newtab-customize-panel-anchor"></div>
          <div id="newtab-customize-panel-inner-wrapper">
            <div id="newtab-customize-title" class="newtab-customize-panel-item">
              <label>&newtab.customize.cog.title2;</label>
            </div>
  
            <div class="newtab-customize-complex-option">
              <div id="newtab-customize-classic" class="newtab-customize-panel-superitem newtab-customize-panel-item selectable">
                  <label>&newtab.customize.classic;</label>
              </div>
              <div id="newtab-customize-enhanced" class="newtab-customize-panel-subitem">
                  <label class="checkbox"></label>
                  <label>&newtab.customize.cog.enhanced;</label>
              </div>
            </div>
            <div id="newtab-customize-blank" class="newtab-customize-panel-item selectable">
              <label>&newtab.customize.blank2;</label>
            </div>
            <div id="newtab-customize-learn" class="newtab-customize-panel-item">
              <label>&newtab.customize.cog.learn;</label>
            </div>
          </div>
      </div>
    </div>
  
    <div id="newtab-intro-mask">
      <div id="newtab-intro-modal">
        <div id="newtab-intro-header"/>
        <div id="newtab-intro-body">
          <div id="newtab-intro-content">
            <div id="newtab-intro-text">
              <p/><p/>
            </div>
          </div>
          <div id="newtab-intro-buttons">
            <input id="newtab-intro-button" type="button" default="true" onclick="gIntro._exitIntro()"/>
67         </div>
68       </div>
69       <div id="newtab-intro-footer">
70         <ul>
71           <li id="newtab-intro-link"/>
72         </ul>
73       </div>
74     </div>
75   </div>
76 
77     <div id="newtab-vertical-margin">
78       <div id="newtab-margin-top"/>
79         <div id="newtab-margin-undo-container">
80           <div id="newtab-undo-container" undo-disabled="true">
81             <label id="newtab-undo-label">&newtab.undo.removedLabel;</label>
82             <button id="newtab-undo-button" tabindex="-1"
83                     class="newtab-undo-button">&newtab.undo.undoButton;</button>
84             <button id="newtab-undo-restore-button" tabindex="-1"
85                     class="newtab-undo-button">&newtab.undo.restoreButton;</button>
86             <button id="newtab-undo-close-button" tabindex="-1" title="&newtab.undo.closeTooltip;"/>
87           </div>
88         </div>
89 
90       <div id="newtab-search-container">
91         <div id="newtab-search-form">
92           <div id="newtab-search-icon"/>
93           <input type="text" name="q" value="" id="newtab-search-text"
94                  aria-label="&contentSearchInput.label;" maxlength="256" dir="auto"/>
95           <input id="newtab-search-submit" type="button" value=""
96                  aria-label="&contentSearchSubmit.label;"/>
97         </div>
98       </div>
99 
100       <div id="newtab-horizontal-margin">
101         <div class="newtab-side-margin"/>
102 
103         <div id="newtab-grid">
104         </div>
105 
106         <div class="newtab-side-margin"/>
107       </div>
108 
109       <div id="newtab-margin-bottom"/>
110   </div>
111       <input id="newtab-customize-button" type="button" dir="&locale.dir;" title="&newtab.customize.title;"/>
        </form>
112 </body>
</html>
