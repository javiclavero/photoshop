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
