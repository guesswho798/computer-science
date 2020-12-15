=========================================================================================
in the console
=========================================================================================
oPagesInfo.pages[PageNumber]
			|
			|
			V
o: true
pid: 104094218
gid: "VTVUJWVJSW_^J^_JVUU"
lbl: "1"...
			|
			|
			V
antiPlagiarism(oPagesInfo.pages[PageNumber].gid) --> token


function antiPlagiarism(gid) {

    var token = "";
    for (i = 0; i < gid.length; i++){
        token += String.fromCharCode(103 ^ gid.charCodeAt(i));
    }
    return token;
}


antiPlagiarism is a function that runs through some attribute from the page called
gid and turns it to a token by calculating each chars code by the power of 103 and
throwing all back together into a string which is the token and returning it to a
function called BookPageState_GetPageGuid which returns the token to a function
called ShowTTS that creats the link that gets the photo.

			^
			|
			|

BookPageState_GetPageGuid(PageNumber)

			^
			|
			|

function ShowTTS() {
    gPageToken = BookPageState_GetPageGuid(PageNumber);
    sPageLabel = BookPageState_GetPageLabel(PageNumber);
    var link = "/KotarApp/Viewer/Popups/TTS.aspx?nBookID=" + BookID + "&gPageToken=" + gPageToken + "&sPageLabel=" + sPageLabel;
}


soooo....
after all of that we can create a download link to each page like this
the input to the program would be the URL of the first page and we would
get the length of the book through this command oPagesInfo.pages.length.

responses = []
for n in range(oPagesInfo.pages.length):
	link = "https://kotarimagesSTG.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=" + BookPageState_GetPageGuid(n) + "&nStep=6&nVersion=11"
	responses.append(requests.get(link))
	img = Image.open(BytesIO(response.content))

responses = []
for (var i = 0; i < oPagesInfo.pages.length; i++) {
	 responses[i] = "https://kotarimagesSTG.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=" + BookPageState_GetPageGuid(i) + "&nStep=6&nVersion=11";
}