(() => { const el = document.elementFromPoint(innerWidth/2, innerHeight/2); console.log('CENTER_EL:', el); console.log('STYLE:', getComputedStyle(el)); })();
