//Initialise vars
var current_document = app.activeDocument;
app.displayDialogs = DialogModes.NO;
var sep = String ("_");
var baseName = current_document.name.replace(/\.[^\.]+$/, '');
var dupeName = baseName + sep + "para_redes";
var nameIG = baseName + sep + "IG";
var namePanoIG = baseName + sep + "PanoIG";
var nameFB = baseName + sep + "FB";
var nameLS = baseName + sep + "LS";
var nameGoogle = baseName + sep + "Google";
var name500px = baseName + sep + "500px";
var w = current_document.width.value;
var h = current_document.height.value;
var pathExport = "C:/Users/javie/Desktop/fotosPosts/"
var withBorders = true;
var borderRatio = 0.04;
var instagramWidth = 1080;
var instagramHeight = 1350;
var locationscoutWidth = 2048;
var locationscoutHeight = 1400;
var locationscoutSignature = true;
var googleSignature = true;
var signaturePositionLS = 3;
var signaturePositionGoogle = 4;
var signatureOpacity = 50;
var gaussianBlurRadiusEnfoque = 20;
var signatureSizeLS = 150;
var signatureSizeGoogle = 100;
var panoramaPiecesIG = 0;
var sitckInRatioIG = 4;
//1 1080x1080 1:1
//2 1080x721 3:2
//3 1080x771 5:4
//4 1080x1350 4:5


//next tasks: 15MB Facebook
//next tasks: bigger signature LS
//next tasks: save for 500px


saveForInstagram(); //guardar para Instagram
if(panoramaPiecesIG!=0) { savePanoForInstagram(panoramaPiecesIG); }
saveForFacebook(); //guardar para facebook
saveForLocationScout(); //guardar para Instagram
saveForGoogle(); //guardar para Google
saveFor500px(); //guardar para 500px
//saveForWhatsapp();




/*
app.bringToFront();  
var logoFile = "C:/Sites/photoshop/location.png";				// Logo Image file should be large for resize down works better than up. Vector files can be any size.
var LogoSize = 5;											// percent of document height to resize Logo to
var LogoMargin = 1;                                         // percent of Document height the Logo should have as a margin
var LogoLocation = 9;										// Like a tick tack toe board 1 through 9.  1=Top Left 9=Bottom Right
var LogoRotation = -20;										// Center Logo Location 5 can be Rotated -90 through +90 degrees  + degree Clockwise - CounterClockwise

app.displayDialogs = DialogModes.NO;				// Dialog off 
var strtRulerUnits = app.preferences.rulerUnits;	// Save Users ruler units 
var strtTypeUnits = app.preferences.typeUnits;		// Save Users Type units 
app.preferences.rulerUnits = Units.PIXELS;			// work with pixels 
app.preferences.typeUnits = TypeUnits.PIXELS;		// work with pixels 
//placeLogo(logoFile, LogoSize, LogoMargin, LogoLocation, LogoRotation); // Place Logo into the location 5 would be Document's center
if (documents.length) app.activeDocument.suspendHistory('placeLogo','placeLogo(logoFile,LogoSize,LogoMargin, LogoLocation, LogoRotation)' );
app.preferences.rulerUnits = strtRulerUnits;		// Restore user ruler units  
app.preferences.typeUnits = strtTypeUnits;			// Restore user type units    
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function placeLogo(Image,Size,Margin,position,angle){  
	if(!documents.length) return;  							// if no document return
	var fileObj = new File(Image);	 		               	// the passed file
	if(!fileObj.exists){  									// If file does not exits tell user 
		alert(fileObj.name  + " does not exist!"); 			// Alert User 
		return;  											// return
	}  
	try{  
		var doc = app.activeDocument;						// set Doc object to active document
		var layers = app.activeDocument.layers;				// get layers
		app.activeDocument.activeLayer = layers[0];			// Target Top Layer
		placeFile(fileObj); 								// Place in file the Logo File
		activeDocument.activeLayer.resize(100 ,100,AnchorPosition.MIDDLECENTER); // Insure Place did not scale layer  
	//	var SB = activeDocument.activeLayer.bounds; 		// get layers bounds 
	//	var layerHeight = SB[3] - SB[1];					// get layers height  
	//	var resizePercent = (100/layerHeight)*(Size/100*doc.height.value); // Percent to resize by 
	//	activeDocument.activeLayer.resize(resizePercent ,resizePercent,AnchorPosition.MIDDLECENTER);  // Resize width and height by percentage 
		marginSize = 1/100*doc.height.value;			// Margin size
		var selectedRegion = Array(Array(0+marginSize,0+marginSize), Array(doc.width-marginSize,0+marginSize), Array(doc.width-marginSize,doc.height-marginSize), Array(0+marginSize,doc.height-marginSize));
		activeDocument.selection.select(selectedRegion);    // Select  document area for the logo Positioning
		switch (position){									// Align resized logo smart object layer into position
			case 1 : align('AdLf'); align('AdTp'); break;
			case 2 : align('AdCH'); align('AdTp'); break;
			case 3 : align('AdRg'); align('AdTp'); break;
			case 4 : align('AdLf'); align('AdCV'); break;
			case 5 : align('AdCH'); align('AdCV'); activeDocument.selection.deselect(); activeDocument.activeLayer.rotate(angle); break;
			case 6 : align('AdRg'); align('AdCV'); break;
			case 7 : align('AdLf'); align('AdBt'); break;
			case 8 : align('AdCH'); align('AdBt'); break;
			case 9 : align('AdRg'); align('AdBt'); break;
			default : break;
		}
		app.activeDocument.selection.deselect();			// deselect
	}
	catch(e) { alert(e + ': on line ' + e.line); }			// inform user of error  
	finally{ }  
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
function placeFile(placeFile) {  
    var desc21 = new ActionDescriptor();  
    desc21.putPath( charIDToTypeID('null'), new File(placeFile) );  
    desc21.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );  
    var desc22 = new ActionDescriptor();  
    desc22.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );  
    desc22.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );  
    desc21.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22 );  
    executeAction( charIDToTypeID('Plc '), desc21, DialogModes.NO );  
} 

function align(method) {
	var desc = new ActionDescriptor();
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
	desc.putReference( charIDToTypeID( "null" ), ref );
	desc.putEnumerated( charIDToTypeID( "Usng" ), charIDToTypeID( "ADSt" ), charIDToTypeID( method ) );
	try{
		executeAction( charIDToTypeID( "Algn" ), desc, DialogModes.NO );
	}catch(e){}
}







function saveForWhatsapp(){
 
 if(!documents.length) return;  
 
 	var fileObj = new File("C:/Sites/photoshop/location.png");	 		               	// the passed file
	if(!fileObj.exists){  									// If file does not exits tell user 
		alert(fileObj.name  + " does not exist!"); 			// Alert User 
		return;  											// return
	} 
	try{ 
        
        var doc = app.activeDocument;						// set Doc object to active document
       var layers = doc.layers;				// get layers
		doc.activeLayer = layers[0];			// Target Top Layer
    
		placeFile(fileObj);
        doc.activeLayer.rasterize(RasterizeType.ENTIRELAYER)

        
        
        
        
  var Position = doc.activeLayer.bounds;

    switch(3) {
        case 1:
            Position[0] = 80 - Position[0];
            Position[1] = 80 - Position[1];
            break;
        case 2:
            Position[0] = doc.width - 240 - Position[0];
            Position[1] = 80 - Position[1];
            break;
        case 3:
            Position[0] = 80 - Position[0];
            Position[1] = doc.height - 240 - Position[1] ;
            break;
        case 4:
            var posX = doc.width - 240;
            var PosY = doc.height - 50;
            break;
        }
    
  doc.activeLayer.translate(-Position[0],Position[1]);
  
  
  
      var newColor = new SolidColor();
    newColor.rgb.red = 255;
    newColor.rgb.green = 255;
    newColor.rgb.blue = 255;

    var myLayerRef = current_document.artLayers.add();
    myLayerRef.kind = LayerKind.TEXT;
    myLayerRef.name = "CAEN";
    var myTextRef = myLayerRef.textItem;
    myTextRef.color = newColor;
    myTextRef.size = 50;
    myTextRef.font = "Calibri-BoldItalic";
    myTextRef.contents = "CAEN";
    myTextRef.tracking = 15;
    
    myTextRef.justification = Justification.LEFT;
    myLayerRef.blendMode = BlendMode.NORMAL;
    myLayerRef.opacity = 100;

        myTextRef.position = new Array( 240 , doc.height - 92)



  
  
  }
catch(e) { alert(e + ': on line ' + e.line); }			// inform user of error  
	finally{ } 
  }




function resizeForRatio(intRatio) {
    
    switch(intRatio){
        case 0:
            
            break;
        case 1:
            current_document.resizeCanvas(1080 , 1080, AnchorPosition.MIDDLECENTER);
            break;
        case 2:
            current_document.resizeCanvas(1080 , 721, AnchorPosition.MIDDLECENTER);
            break;
        case 3:
            current_document.resizeCanvas(1080 , 771, AnchorPosition.MIDDLECENTER);
            break;
        case 4:
            current_document.resizeCanvas(1080 , 1350, AnchorPosition.MIDDLECENTER);
            break;
        
        }
    
    }
//creamos un documento nuevo acoplado
function duplicateFlattenDocument(dupeName) {
    current_document.duplicate((dupeName), true);
    current_document = app.activeDocument;  
    current_document.flatten();
}

function saveForFacebook() {
    
    //max 15MB !!!!!!!!!!!!!
 
    
    
    duplicateFlattenDocument(dupeName); //creamos un documento nuevo acoplado
    //Facebook prefered widths 730px, 960px, 2048px
    if (w>=2048) {
        var fW = 2048;
    }else if (w>=960) {
        var fW = 960;
     }else if (w>=730) {
         var fW = 730;
     }else{
         var fW = current_document.width.value;     
     }
    current_document.resizeImage(UnitValue( fW,"px"),null,72,ResampleMethod.BICUBIC);
    var fH = current_document.height.value;
    
    var options = new ExportOptionsSaveForWeb();
    options.quality = 100;
    options.format = SaveDocumentType.JPEG;
    options.optimized = true;
    options.includeProfile = true;
    current_document.changeMode(ChangeMode.RGB);

    exportForWeb(nameFB);
}

function savePanoForInstagram(panoPieces) {
    
    duplicateFlattenDocument(dupeName); //creamos un documento nuevo acoplado
    
    if (withBorders) {
        createBorders(panoPieces);
    }

    var fW = 1080 * panoPieces;
    
    
    current_document.resizeImage(UnitValue(fW,"px"),null,72,ResampleMethod.BICUBIC);
    var fH = current_document.height.value;
    
    for (i=1;i<=panoPieces;i++) {
       duplicateFlattenDocument(dupeName);
       current_document.resizeCanvas(1080*i, fH, AnchorPosition.MIDDLERIGHT); 
       current_document.resizeCanvas(1080, fH, AnchorPosition.MIDDLELEFT); 
       
       switch(sitckInRatioIG){
        case 0:
            
            break;
        case 1:
            current_document.resizeCanvas(1080 , 1080, AnchorPosition.MIDDLECENTER);
            break;
        case 2:
            current_document.resizeCanvas(1080 , 721, AnchorPosition.MIDDLECENTER);
            break;
        case 3:
            current_document.resizeCanvas(1080 , 771, AnchorPosition.MIDDLECENTER);
            break;
        case 4:
            current_document.resizeCanvas(1080 , 1350, AnchorPosition.MIDDLECENTER);
            break;
        
        }
    
       exportForWeb(namePanoIG + sep + (panoramaPiecesIG-i+1));
    }

   exportForWeb(namePanoIG + sep + "0");
    
}

function saveForInstagram() {
    
    duplicateFlattenDocument(dupeName); //creamos un documento nuevo acoplado
    
    if (withBorders) {
        createBorders(1);
        }


    if (w==h) { //formato cuadrado
        current_document.resizeImage(UnitValue(instagramWidth,"px"),null,72,ResampleMethod.BICUBIC);
    } else if (w>h) { //landscape
        current_document.resizeImage(UnitValue(instagramWidth,"px"),null,72,ResampleMethod.BICUBIC);
     } else if (w<h) { //portrait
        current_document.resizeImage(null,UnitValue(instagramHeight,"px"),72,ResampleMethod.BICUBIC); 
        if (current_document.width.value<instagramWidth) {
            current_document.resizeCanvas(instagramWidth , instagramHeight, AnchorPosition.MIDDLECENTER);
        }
    }
    if(sitckInRatioIG>0){
        resizeForRatio(sitckInRatioIG);
    }
   // enfoqueLuzIntensa();
    exportForWeb(nameIG);

    }
function saveForLocationScout() {

    duplicateFlattenDocument(dupeName); //creamos un documento nuevo acoplado
     if (w==h) { //formato cuadrado
        current_document.resizeImage(null,UnitValue(locationscoutHeight,"px"),72,ResampleMethod.BICUBIC);
    } else if (w>h) { //landscape
        current_document.resizeImage(UnitValue(locationscoutWidth,"px"),null,72,ResampleMethod.BICUBIC);
        
     } else if (w<h) { //portrait
        current_document.resizeImage(null,UnitValue(locationscoutHeight,"px"),72,ResampleMethod.BICUBIC); 
        
    }

    if (locationscoutSignature) {
           printSignature(signaturePositionLS, signatureSizeLS);
        }
  exportForWeb(nameLS);
    
    
    }

function saveForGoogle() {
    
    duplicateFlattenDocument(dupeName); //creamos un documento nuevo acoplado
     if (w==h) { //formato cuadrado
        current_document.resizeImage(null,UnitValue(locationscoutHeight,"px"),72,ResampleMethod.BICUBIC);
    } else if (w>h) { //landscape
        current_document.resizeImage(UnitValue(locationscoutWidth,"px"),null,72,ResampleMethod.BICUBIC);
        
     } else if (w<h) { //portrait
        current_document.resizeImage(null,UnitValue(locationscoutHeight,"px"),72,ResampleMethod.BICUBIC); 
        
    }


    if (googleSignature) {
           printSignature(signaturePositionGoogle, signatureSizeGoogle);
        }
    exportForWeb(nameGoogle);
    }

function saveFor500px() {
    
       duplicateFlattenDocument(dupeName); //creamos un documento nuevo acoplado
       exportForWeb(name500px);
    }

function createBorders(intPanoPieces) {
    var BGcolor = new SolidColor();
    //BGcolor.rgb.red = 255;
    //BGcolor.rgb.green = 255;
    //BGcolor.rgb.blue = 255;
    BGcolor.rgb.hexValue = "FFFFFF";
   // app.backgroundColor.rgb.hexValue = BGcolor.rgb.hexValue;
    app.backgroundColor.rgb.hexValue = BGcolor.rgb.hexValue;
    
    current_document.resizeCanvas(w + ( ( h*(borderRatio+1) ) - h ), h*(borderRatio+1), AnchorPosition.MIDDLECENTER);


}

function exportForWeb(fileName) {
    
    var options = new ExportOptionsSaveForWeb();
    options.quality = 100;
    options.format = SaveDocumentType.JPEG;
    options.optimized = true;
    options.includeProfile = true;
    current_document.changeMode(ChangeMode.RGB);
    //current_document.bitsPerChannel == BitsPerChannelType.EIGHT
    var fW = current_document.width.value;
    var fH = current_document.height.value;
    
    current_document.exportDocument(File(pathExport + fileName + sep + fW + "x" + fH + ".jpg"),ExportType.SAVEFORWEB,options);
    current_document.close(SaveOptions.DONOTSAVECHANGES);
    current_document = app.activeDocument;
    
    }

function printSignature(signaturePosition,signatureSize){
    
    
    var newColor = new SolidColor();
    newColor.rgb.red = 255;
    newColor.rgb.green = 255;
    newColor.rgb.blue = 255;

    var myLayerRef = current_document.artLayers.add();
    myLayerRef.kind = LayerKind.TEXT;
    myLayerRef.name = "javi.clavero";
    var myTextRef = myLayerRef.textItem;
    myTextRef.color = newColor;
    myTextRef.size = signatureSize;
    myTextRef.font = "RadenaPersonalUse-Regular";
    myTextRef.contents = "javi clavero";
    myTextRef.tracking = 15;
    
    myTextRef.justification = Justification.LEFT;
    myLayerRef.blendMode = BlendMode.NORMAL;
    myLayerRef.opacity = signatureOpacity;

    var myLayerRef2= current_document.artLayers.add();
    myLayerRef2.kind = LayerKind.TEXT;
    myLayerRef2.name = "@";
    var myTextRef2 = myLayerRef2.textItem;
    myTextRef2.color = newColor;
    myTextRef2.size = signatureSize * 1.1;
    myTextRef2.font = "MelanicBlackScript-Regular";
    myTextRef2.contents = "@";
    
    myLayerRef2.blendMode = BlendMode.NORMAL;
    myLayerRef2.opacity = signatureOpacity;
    
    var myLayerRef3 = current_document.artLayers.add();
    myLayerRef3.kind = LayerKind.TEXT;
    myLayerRef3.name = "punto";
    var myTextRef3 = myLayerRef3.textItem;
    myTextRef3.color = newColor;
    myTextRef3.size = signatureSize * 0.4;
    myTextRef3.font = "RadenaPersonalUse-Regular";
    myTextRef3.contents = ".";
    
    myTextRef3.justification = Justification.LEFT;
    myLayerRef3.blendMode = BlendMode.NORMAL;
    myLayerRef3.opacity = signatureOpacity;





    switch(signaturePosition) {
        case 1:
            var posX = 45;
            var PosY = 80;
            break;
        case 2:
            var posX = current_document.width - 240;
            var PosY = 80;
            break;
        case 3:
            var posX = 65;
            var PosY = current_document.height - 50;
            break;
        case 4:
            var posX = current_document.width - 240;
            var PosY = current_document.height - 50;
            break;
        }
        myTextRef2.position = new Array( posX , PosY);
        myTextRef.position = new Array( posX + signatureSize * 0.48, PosY);
        
        myTextRef3.position = new Array(  posX + signatureSize, PosY);
}

function enfoqueLuzIntensa() {
    
    var newLayer1 = current_document.activeLayer.duplicate();
    var newLayer2 = current_document.activeLayer.duplicate();
    current_document.activeLayer = newLayer1;
    newLayer1.invert();
    newLayer1.blendMode  = BlendMode.VIVIDLIGHT;
    
    var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
    newLayer1 = app.activeDocument.activeLayer;
    
    current_document.activeLayer.applyGaussianBlur(gaussianBlurRadiusEnfoque);
    
    var newGroup = current_document.layerSets.add();
    newGroup.name = "Enfoque";
    
    newLayer2.move(newGroup, ElementPlacement.INSIDE);
    newLayer1.move(newGroup, ElementPlacement.INSIDE);


    newGroup.blendMode = BlendMode.OVERLAY;
    newGroup.opacity = 33;
    }
