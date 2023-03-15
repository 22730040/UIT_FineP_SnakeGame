package utils

import "fmt"

type ErrorResponse struct {
	Status int
	Code   string
	Desc   string
}

func (e ErrorResponse) Error() string {
	return fmt.Sprintf("{\"status\":%d,\"code\":\"%s\",\"desc\":\"%s\"}", e.Status, e.Code, e.Desc)
}
