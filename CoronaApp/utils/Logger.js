class Logger {
    #level = 0;
    #enters = 0;
    setLevel(level){
        this.#level = level;
    }

    getCurrentDateTime(){
        const padding = (input) => {
            return (input < 10 ? '0' : '') + input;
        }
        let timestamp = new Date();
        return  padding(timestamp.getDate()) + "/"
            + padding(timestamp.getMonth()) + "/"
            + padding(timestamp.getFullYear()) + " "
            + padding(timestamp.getHours()) + ":"
            + padding(timestamp.getMinutes()) + ":"
            + padding(timestamp.getSeconds());
    }

    log(message, level){
        let datetime = this.getCurrentDateTime();
        if(level === DEBUG){
            console.debug("[DBG ] " + datetime + ": " + message);
        }else if(level === INFO){
            console.info("[INFO] " + datetime + ": " + message);
        }else if(level === WARN){
            console.warn("[WARN] " + datetime + ": " + message);
        }else if(level === CRITICAL){
            console.error("[ERR ] " + datetime + ": " + message);
        }else if(level === EXCEPTION){
            console.error(message)
        }
    }

    enter(methodName, fileName){
        if(fileName === undefined || fileName === null){
            fileName = "";
        }else{
            fileName += "#";
        }
        this.info("ENTER " + fileName + methodName + ". Entered: " + this.#enters);
        this.#enters++;
    }

    leave(methodName, fileName){
        if(fileName === undefined || fileName === null){
            fileName = "";
        }else{
            fileName += "#";
        }
        this.#enters--;
        this.info("LEAVE " + fileName + methodName + ". Left: " + this.#enters);
    }

    unexpectedLeft(methodName, fileName) {
        if(fileName === undefined || fileName === null){
            fileName = "";
        }else{
            fileName += "#";
        }
        this.warn("UNEXPECTED LEFT " + fileName + methodName);
    }

    debug(data){
        this.log(data, DEBUG);
    }

    info(data){
        this.log(data, INFO);
    }

    warn(data){
        this.log(data, WARN);
    }

    critical(data){
        this.log(data, CRITICAL);
    }

    exception(error) {
        this.log(error, EXCEPTION);
    }
}


const logger = new Logger();
export const DEBUG = 0;
export const INFO = 1;
export const WARN = 2;
export const CRITICAL = 3;
export const EXCEPTION = 3;
export default logger;