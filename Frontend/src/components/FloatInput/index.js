import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { FlWrapper, Label, RedStar } from "./styled"

const FloatingLabel = props => {
    const { label, isRequired, bgcolor, children, fixlabel, isFocus } = props
    const FlRef = useRef(null)
    const [isFl, setFl] = useState(false)

    useEffect(() => {
        const inputDom = FlRef.current && FlRef.current.querySelector("input")
        const valueEmptySelect =
            FlRef.current &&
            FlRef.current.querySelector(".ant-select-selection-placeholder")

        inputDom.addEventListener(
            "focus",
            () => {
                setFl(true)
            },
            false,
        )

        inputDom.onclick = () => {
            setFl(true)
        }

        inputDom.onblur = () => {
            const valueSelect =
                FlRef.current &&
                FlRef.current.querySelector(".ant-select-selection-item")
            const valueInput = inputDom.getAttribute("value")
            setFl(!!valueSelect || !!valueInput)
        }

        if (valueEmptySelect || !isFocus) {
            setFl(false)
        }

        return () => {
            inputDom.removeEventListener(
                "focus",
                () => {
                    setFl(true)
                },
                false,
            )
        }
    }, [isFocus])

    useEffect(() => {
        const inputDom = FlRef.current && FlRef.current.querySelector("input")
        const valueSelection =
            FlRef.current && FlRef.current.querySelector(".ant-select-selection-item")
        const value = inputDom.getAttribute("value")

        setTimeout(() => {
            if (inputDom.getAttribute("value")) {
                setFl(true)
            }
        })

        if (valueSelection || value || document.activeElement === inputDom) {
            setFl(true)
        }
    })

    const dataElement = { ...props }
    delete dataElement.label
    delete dataElement.isRequired
    delete dataElement.bgcolor

    const renderLabel = () =>
        !!label && (
            <Label
                bgcolor={bgcolor}
                isFl={children?.props?.placeholder || isFl || !!fixlabel}
                className="fl-label"
            >
                {label}
                {isRequired && <RedStar>*</RedStar>}
            </Label>
        )
    return (
        <FlWrapper ref={FlRef}>
            {React.cloneElement(
                children,
                { ...dataElement },
                children.props.children,
            )}
            {renderLabel()}
        </FlWrapper>
    )
}

FloatingLabel.propTypes = {
    label: PropTypes.string,
    bgcolor: PropTypes.string,
    isRequired: PropTypes.bool,
    fixlabel: PropTypes.bool,
    children: PropTypes.node,
}

FloatingLabel.defaultProps = {
    label: undefined,
    bgcolor: "white",
    isRequired: false,
    fixlabel: false,
    children: null,
}

export default FloatingLabel
