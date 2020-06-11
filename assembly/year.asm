IDEAL
MODEL small
STACK 100h
JUMPS
DATASEG
; --------------------------
; Your variables here
; --------------------------
;intro/outro text
intro1 db 'Hello there player!$'
intro2 db 'This is my typing game.$'
intro3 db 'You will need to write the sentence on the screen.$'
intro4 db 'Are you ready? Press any button to continue...$'
outro1 db 'Play again? (y/n)$'
outro2 db 'bye bye!$'
openingError db 'An error has occured at opening the file!$'

;starter time staps for calculations
hour db 0
minute db 0
second db 0
wordsPerMinute db 0
wpm db ' -> WPM: $'
TIME db 'Time: $'

;random value
rand db 0

;for printing
divisorTable db 10,1,0

;sound note
Clock equ es:6Ch
note dw 7902

;times player got the wrong character
wrongs db 'Number of mistakes: $'
wrong db 0

;the sentences
s1 db 'Where do we come from? Do I know your name?$'
s2 db 'And it isnt even our dream, its that dogs dream?$'
s3 db 'Youll see something waiting, right there where you left it$'
s4 db 'Or an actor can be elected president, we must continue$'
s5 db 'Will you get a headache if you think too hard?$'
s6 db 'My friend takes a lot of sugar in her tea$'
s7 db 'Yesterday I went to the cinema to see a film$'
s8 db 'I asked him what he had been doing all afternoon$'
s9 db 'Falling down is an accident. Staying down is a choice$'
s10 db 'Promote what you love instead of bashing what you hate$'
s11 db 'Just because my path is different doesnt mean im lost$'
s12 db 'Stop overthinking. You cant control everything, just let it be$'
s13 db 'Excellence is not being the best. Its doing your best$'
s14 db 'A negative mind will never give you a positive life$'
s15 db 'As soon as you stop wanting something you get it$'

offsets dw 0
lenght db 0
CODESEG

proc intro
	mov dx, offset intro1
	call printSentence

	mov al, 10
	call printCharacter

	mov dx, offset intro2
	call printSentence

	mov al, 10
	call printCharacter

	mov dx, offset intro3
	call printSentence

	mov al, 10
	call printCharacter

	mov dx, offset intro4
	call printSentence

	mov ah, 7h
	int 21h

	ret
endp intro

proc getRand
	push ax
	push cx
	push dx

	;getting time
	mov ah, 2ch
	int 21h  ;ch- hour, cl- minutes, dh- seconds, dl- hundreths seconds

	;saving only 4 digits and saving in rand varible range is 0-15
	mov al, dl
	and al, 00001111b
	mov [rand], al

	;getting line

	cmp [rand], 0
	JNE next1

	;got sentence one
	mov [lenght], 43
	mov [offsets], offset s1
	jmp endpicker

	next1:
	cmp [rand], 1
	JNE next2

	;got sentence two
	mov [lenght], 48
	mov [offsets], offset s2
	jmp endpicker

	next2:
	cmp [rand], 2
	JNE next3

	;got sentence three
	mov [lenght], 58
	mov [offsets], offset s3
	jmp endpicker

	next3:
	cmp [rand], 3
	JNE next4

	;got sentence four
	mov [lenght], 54
	mov [offsets], offset s4
	jmp endpicker

	next4:
	cmp [rand], 4
	JNE next5

	;got sentence five
	mov [lenght], 46
	mov [offsets], offset s5
	jmp endpicker

	next5:
	cmp [rand], 5
	JNE next6

	;got sentence six
	mov [lenght], 41
	mov [offsets], offset s6
	jmp endpicker

	next6:
	cmp [rand], 6
	JNE next7

	;got sentence seven
	mov [lenght], 44
	mov [offsets], offset s7
	jmp endpicker

	next7:
	cmp [rand], 7
	JNE next8

	;got sentence eight
	mov [lenght], 48
	mov [offsets], offset s8
	jmp endpicker

	
	next8:
	cmp [rand], 8
	JNE next9

	;got sentence nine
	mov [lenght], 53
	mov [offsets], offset s9
	jmp endpicker

	next9:
	cmp [rand], 9
	JNE next10

	;got sentence ten
	mov [lenght], 54
	mov [offsets], offset s10
	jmp endpicker

	next10:
	cmp [rand], 10
	JNE next11

	;got sentence eleven
	mov [lenght], 53
	mov [offsets], offset s11
	jmp endpicker

	next11:
	cmp [rand], 11
	JNE next12

	;got sentence twelve
	mov [lenght], 62
	mov [offsets], offset s12
	jmp endpicker

	next12:
	cmp [rand], 12
	JNE next13

	;got sentence thirteen
	mov [lenght], 53
	mov [offsets], offset s13
	jmp endpicker

	next13:
	cmp [rand], 13
	JNE next14

	;got sentence fourteen
	mov [lenght], 51
	mov [offsets], offset s14
	jmp endpicker

	next14:
	;got sentence fifteen
	mov [lenght], 48
	mov [offsets], offset s15

	endpicker:

	pop dx
	pop cx
	pop ax
	ret
endp getRand

proc printSentence
	push ax

	mov ah, 9h
	int 21h

	pop ax
	ret
endp printSentence

proc printCharacter
	push ax
	push dx

	mov ah,2
	mov dl, al
	int 21h
	
	pop dx
	pop ax
	ret
endp printCharacter

proc printNumber
	push ax
	push bx
	push dx

	mov bx,offset divisorTable
	nextDigit:
	xor ah,ah ;dx:ax = number
	div [byte ptr bx] ;al = quotient, ah = remainder
	add al,'0'
	call printCharacter ;display the quotient
	mov al,ah ;ah = remainder
	add bx,1 ;bx = address of next divisor
	cmp [byte ptr bx],0 ;Have all divisors been done?
	jne nextDigit

	pop dx
	pop bx
	pop ax
	ret
endp printNumber

proc playnoise
	push ax

	;open speaker
	in al, 61h
	or al, 00000011b
	out 61h, al
	mov al, 0B6h
	out 43h, al

	;play frequency
	mov ax, [note]
	out 42h, al ;Sending lower byte
	mov al, ah
	out 42h, al ;Sending upper byte

	;delay of 0.2 seconds
	mov ax, 40h
	mov es, ax
	mov ax, [Clock]
	FirstTick :
	cmp ax, [Clock]
	je FirstTick
	mov cx, 2 ; 2x0.055sec = 0.11sec
	DelayLoop:
	mov ax, [Clock]
	Tick:
	cmp ax, [Clock]
	je Tick
	loop DelayLoop

	;close the speaker
	in al, 61h
	and al, 11111100b
	out 61h, al
	pop ax
	ret
endp playnoise

proc cor
	push ax
	push bx
	push cx
	mov ah, 09h
	mov cx, 1h
	mov al, 20h
	mov bl, 20h ;This is green color with black
	int 10h
	pop cx
	pop bx
	pop ax
	xor ah, ah
	call printCharacter ;printing the input from player
	ret
endp cor

proc incor
	push ax
	push bx
	push cx

	mov ah, 09h
	mov cx, 1h
	mov al, 20h
	mov bl, 40h ;This is red color with white
	int 10h

	xor ah, ah
	mov al, 'X'
	call printCharacter ;printing the input from player

	pop cx
	pop bx
	pop ax

	ret
endp incor

start:
	mov ax, @data
	mov ds, ax
; --------------------------
; Your code here
; --------------------------
	xor ax, ax

	;displaying intro text
	call intro

	;when player plays again he comes here
	again:
	
	;chosing a random sentence
	call getRand

	;printing the sentence
	mov al, 10
	call printCharacter
	call printCharacter
	mov dx, [offsets] ;offsets is the offset of the chosen sentence
	call printSentence
	mov al, 13
	call printCharacter ;moving the cursor back to the start of the line

	;getting time stamp before input
	mov ah, 2ch
	int 21h ;ch- hour, cl- minutes, dh- seconds, dl- hundreths seconds
	mov [hour], ch
	mov [minute], cl
	mov [second], dh


	;looping on input
l:

	;getting input without echo
	mov ah, 7h
	int 21h

	;calculating if input is good answer
	xor cx, cx
	xor ah, ah
	push ax
	push bx
	mov cx, [offsets] ;moving cx to the start of the sentence
	add cx, bx ;adding the counter
	mov bx, cx
	mov al, [byte ptr bx] ;reading the letter from the sentence
	pop bx
	pop cx
	cmp al, cl ;comparing the letters from input and sentence
	JE correct

	;if in here then player pressed the wrong button

	;displaying the character
	call incor
	inc [wrong]

	;playing the 'wrong' sound
	call playnoise

	jmp incorrect

	correct:
	call cor

	incorrect:

	;looping back
	inc bx
	cmp bl, [lenght] ;cheking if reached the end of the sentence
	JNE l


	;getting time stamp after input
	mov ah, 2ch
	int 21h ;ch- hour, cl- minutes, dh- seconds, dl- hundreths seconds

	;calculating the time between time stamps
	sub ch, [hour]
	cmp ch, 0
	JNE h

	sub cl, [minute]
	cmp cl, 0
	JNE m

	;if in here then minute and hour stayed the same
	mov [hour], 0
	mov [minute], 0
	sub dh, [second]
	mov [second], dh
	jmp show

	m:
	;if here then hour stayed the same but the minute passed
	mov al, 60
	sub al, [second]
	mov [second], al
	add [second], dh
	xor ah, ah
	mov al, [second]
	mov bl, 60
	div bl
	mov [minute], al
	mov al, ah
	mov bl, 60
	mul bl
	mov al, [second]
	cmp al, 60
	JL show
	sub [second], 60
	add [minute], 1
	jmp show

	h:
	;if here then hour changed
	mov al, 60
	sub al, [second]
	mov [second], al
	add [second], dh
	mov al, 60
	sub al, [minute]
	mov [minute], al
	add [minute], cl

	show:
	;displaying the time it took
	mov al, 10
	call printCharacter ;line down
	mov dx, offset TIME
	call printSentence ; "Time: "
	mov al, [minute]
	add al, '0'
	call printCharacter ;writing minutes
	mov al, ':'
	call printCharacter
	xor ah, ah
	mov al, [second]
	call printNumber

    ;words per minute
	mov dx, offset WPM
	call printSentence
	xor dx, dx
	mov ax, 600
	mov bl, [second]
	div bx
	call printNumber

	;displaying the times player made a mistake
	mov al, 10
	call printCharacter
	mov dx, offset wrongs
	call printSentence
	mov al, [wrong]
	call printnumber

	;play again?
	pa:
	mov al, 10
	call printCharacter
	mov dx, offset outro1
	call printSentence ;outro text
	mov ah, 7h
	int 21h
	xor bx, bx ;reseting bx for the next round
	mov [wrong], 0 ;reseting times got wrong for next round
	cmp al, 'y'
	JE again ;jumping back to choose a random sentence
	cmp al, 'n'
	JNE pa

	;outro text "bye bye"
	mov al, 10
	call printCharacter
	mov dx, offset outro2
	call printSentence

exit:
	mov ax, 4c00h
	int 21h
END start
