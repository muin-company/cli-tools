package main

import (
	"fmt"
	"os"
)

func doStuff(data interface{}) interface{} {
	result := make(map[string]interface{})
	
	if data != nil {
		switch data.(type) {
		case map[string]interface{}:
			m := data.(map[string]interface{})
			for k, v := range m {
				if v != nil {
					if k != "" {
						result[k] = v
					}
				}
			}
		case []interface{}:
			arr := data.([]interface{})
			for i := 0; i < len(arr); i++ {
				result[fmt.Sprintf("%d", i)] = arr[i]
			}
		default:
			result["data"] = data
		}
	}
	
	return result
}

func main() {
	err := doEverything()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func doEverything() error {
	// TODO: split this up someday
	data := doStuff(map[string]interface{}{
		"name": "test",
		"value": 42,
		"nested": map[string]interface{}{
			"a": 1,
			"b": 2,
		},
	})
	
	fmt.Println(data)
	
	data2 := doStuff(data)
	_ = data2
	
	data3 := doStuff(nil)
	_ = data3
	
	return nil
}
