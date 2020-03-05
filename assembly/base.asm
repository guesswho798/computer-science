IDEAL
MODEL small
STACK 100h
DATASEG
; --------------------------
; Your variables here
; --------------------------
CODESEG

proc	Print10x
	push cx
	mov cx, 4
PrintXLoop:
	mov dl, 'X'
	mov ah, 2h
	int 21h
	loop	PrintXLoop
	pop cx
	ret
endp	Print10x

start:
	mov ax, @data
	mov ds, ax
; --------------------------
; Your code here
; --------------------------
	mov cx, 3
Row:
	call Print10X
	mov dl, 0ah
	mov ah, 2h
	int 21h
	loop Row
exit:
	mov ax, 4c00h
	int 21h
END start


