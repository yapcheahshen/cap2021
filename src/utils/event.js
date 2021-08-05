export function debounce(func,delay=1000){
    let timer=null;
    return ()=>{
        let context =this;
        let args=arguments;
        clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(context,args);
        },delay);
    }
}
export const scrollToTop=event=>{
    let e=event.target;
    while (e&& e.scrollTop==0) e=e.parentElement;
    if (e)e.scrollTo(0,0)
}