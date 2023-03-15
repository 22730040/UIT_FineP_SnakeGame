package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

func WriteResponse(w http.ResponseWriter, code int, data interface{}) {
	v, ok := data.(string)
	if ok {
		w.WriteHeader(code)
		w.Write([]byte(v))
		return
	}
	res, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		log.Fatal(err)
	}
	w.WriteHeader(code)
	w.Write(res)
}
