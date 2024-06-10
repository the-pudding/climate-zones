<script>
	export let text;
</script>

<div class="text tape-text-wrap">
	<p class="text tape-text-wrap-fg">
		<span>{@html text}
            <br>
            <svg width="50" viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.56145 5.0339L6.56145 -9.8082e-07L22.479 -2.8504e-07L22.479 5.0339L29 5.0339L14.5 18L-2.12739e-06 5.0339L6.56145 5.0339Z" fill="white"/>
            </svg>
        </span>
        <!-- <span class="arrow-span">
        </span> -->
	</p>
	<p
		class="text tape-text-wrap-bg"
		aria-hidden="true"
		style=""
	>
		<span>{@html text}
            <br>
            <svg width="50" viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.56145 5.0339L6.56145 -9.8082e-07L22.479 -2.8504e-07L22.479 5.0339L29 5.0339L14.5 18L-2.12739e-06 5.0339L6.56145 5.0339Z" fill="white"/>
            </svg>        
        </span>
        <!-- <span class="arrow-span">
        </span> -->
        
        
	</p>
</div>

<style>


    span svg {
        width: 50px;
        height: 35px;
        padding-top: 10px;
    }

    .tape-text-wrap-bg span svg {
        opacity: 0;
    }

	p {
		font-size: 24px;
        margin: 0;
	}

    .tape-text-wrap {
    position: relative;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    }

.tape-text-wrap .tape-text-wrap-fg,
.tape-text-wrap .tape-text-wrap-bg {
    width: calc(100% - 20px);
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    background-color: transparent;
}

.tape-text-wrap .tape-text-wrap-fg span,
.tape-text-wrap .tape-text-wrap-bg span {
    padding: 15px 0 8px;
    box-shadow: 15px 0 transparent, -15px 0 transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    height: 100%;
    background-color: transparent;
    font-family: 'Atlas Typewriter';
}

.tape-text-wrap .tape-text-wrap-fg span h1,
.tape-text-wrap .tape-text-wrap-fg span h2,
.tape-text-wrap .tape-text-wrap-fg span h3,
.tape-text-wrap .tape-text-wrap-fg span h4,
.tape-text-wrap .tape-text-wrap-bg span h1,
.tape-text-wrap .tape-text-wrap-bg span h2,
.tape-text-wrap .tape-text-wrap-bg span h3,
.tape-text-wrap .tape-text-wrap-bg span h4 {
    display: contents;
    margin: 0px;
}

.tape-text-wrap .tape-text-wrap-fg span h1 span,
.tape-text-wrap .tape-text-wrap-fg span h2 span,
.tape-text-wrap .tape-text-wrap-fg span h3 span,
.tape-text-wrap .tape-text-wrap-fg span h4 span,
.tape-text-wrap .tape-text-wrap-bg span h1 span,
.tape-text-wrap .tape-text-wrap-bg span h2 span,
.tape-text-wrap .tape-text-wrap-bg span h3 span,
.tape-text-wrap .tape-text-wrap-bg span h4 span {
    font-weight: bold;
}

.tape-text-wrap .tape-text-wrap-fg {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    top: -5px;
    color: white;
}

.tape-text-wrap .tape-text-wrap-fg span {
    color: white;
    padding: 11px 0 8px;
    box-shadow: 15px 0 transparent, -15px 0 transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    background-color: transparent;
}

.tape-text-wrap .tape-text-wrap-bg span {
    border-radius: 5px;
    height: 100%;
    color: var(--body-background-color);
    background-color: var(--body-background-color);
    box-shadow: 15px 0 var(--body-background-color), -15px 0 var(--body-background-color);
    /* filter: blur(10px); */
}

.tape-text-wrap .tape-text-wrap-fg span.arrow-span, .tape-text-wrap .tape-text-wrap-bg span.arrow-span {
    padding-top: 10px;
    margin-top: 10px;
}


</style>
