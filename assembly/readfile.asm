IDEAL
MODEL small
STACK 100h
DATASEG
; --------------------------
; Your variables here
; --------------------------

filename db 'hey.txt',0
filehandle dw ?
ErrorMsg db 'Error', 10, 13,'$'
NumOfBytes dw 100
buffer db 10 dup (?)
CODESEG

proc OpenFile

	;opening file
	mov ah, 3Dh
	xor al, al
	lea dx, [filename]
	int 21h
	jc openerror
	mov [filehandle], ax
	ret

	;checking for error
	openerror:
	mov dx, offset ErrorMsg
	mov ah, 9h
	int 21h

	ret
endp OpenFile

proc ReadFile

	;jump to position
	mov ah, 42h
	mov al, 0
	mov bx, [filehandle]
	mov cx, 0
	mov dx, 45
	int  21h
	
	; Read file
	mov ah,3Fh
	mov bx, [filehandle]
	mov cx,[NumOfBytes]
	mov dx,offset Buffer
	int 21h

	ret
endp ReadFile

proc CloseFile

	;closing file
	mov ah,3Eh
	mov bx, [filehandle]
	int 21h

	ret
endp CloseFile

start:
	mov ax, @data
	mov ds, ax
; --------------------------
; Your code here
; --------------------------
	
	call OpenFile
	call ReadFile
	mov ah, 9
	int 21h
	call CloseFile

exit:
	mov ax, 4c00h
	int 21h
END start


