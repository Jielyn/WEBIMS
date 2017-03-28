/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.skin = 'minimalist';
    config.height = '100px';
    config.toolbarLocation = 'top';
    config.resize_enabled = false;
    config.tabSpaces = 4;   // tab == 4空格
    config.startupOutlineBlocks = false;
    config.removePlugins = 'elementspath';
    config.font_defaultLabel = 'Microsoft YaHei';
    // config.extraPlugins =
    config.toolbar = [
        ['Bold', 'Smiley'] //  'Image', 'TextColor' 'Font','FontSize',, 'Image'
    ];
    // config.miley_images = [
    //
    // ];
    // 字体可选大小
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px';

};
